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
      forma.addEventListener(
        "submit", guarda);
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
                  Libro} */
      const modelo = {
        isbn,
        nombre,
        autor,
        editorial
      };
      await daoLibro.
        add(modelo);
      muestraLibros();
    } catch (e) {
      muestraError(e);
    }
  }
