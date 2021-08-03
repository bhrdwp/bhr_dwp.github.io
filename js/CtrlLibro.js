import {
    getAuth,
    getFirestore
  } from "../lib/fabrica.js";
  import {
    getString,
    muestraError
  } from "../lib/util.js";
  import {
    muestraLibros
  } from "./navegacion.js";
  import {
    tieneRol
  } from "./seguridad.js";
  
  const daoLibro =
    getFirestore().
      collection("Libro");
  const params =
    new URL(location.href).
      searchParams;
  const id = params.get("id");
  /** @type {HTMLFormElement} */
  const forma = document["forma"];
  
  getAuth().onAuthStateChanged(
    protege, muestraError);
  
  /** @param {import(
      "../lib/tiposFire.js").User}
      usuario */
  async function protege(usuario) {
    if (tieneRol(usuario,
      ["Administrador"])) {
      busca();
    }
  }
  
  /** Busca y muestra los datos que
   * corresponden al id recibido. */
  async function busca() {
    try {
      const doc =
        await daoLibro.
          doc(id).
          get();
      if (doc.exists) {
        /**
         * @type {
            import("./tipos.js").
                    Libro} */
        const data = doc.data();
        forma.isbn.value = data.isbn;
        forma.nombre.value = data.nombre || "";
        forma.autor.value = data.autor || "";
        forma.editorial.value = data.editorial || "";
        forma.addEventListener(
          "submit", guarda);
        forma.eliminar.
          addEventListener(
            "click", elimina);
      } else {
        throw new Error(
          "No se encontró libro.");
      }
    } catch (e) {
      muestraError(e);
      muestraLibros();
    }
  }
  
  /** @param {Event} evt */
  async function guarda(evt) {
    try {
      evt.preventDefault();
      const formData =
        new FormData(forma);
      const isbn = getString(
          formData, "isbn").trim();  
      const nombre = getString(formData, "nombre").trim();
      const autor = getString(formData, "autor").trim();
      const editorial = getString(formData, "editorial").trim();
     
      /**
       * @type {
          import("./tipos.js").
                  Alumno} */
      const modelo = {
        isbn, 
        nombre,
        autor,
        editorial
      };
      await daoLibro.
        doc(id).
        set(modelo);
      muestraLibros();
    } catch (e) {
      muestraError(e);
    }
  }
  
  async function elimina() {
    try {
      if (confirm("Confirmar la " +
        "eliminación")) {
        await daoLibro.
          doc(id).
          delete();
        muestraLibros();
      }
    } catch (e) {
      muestraError(e);
    }
  }
  