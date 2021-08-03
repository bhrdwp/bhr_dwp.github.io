// @ts-nocheck
import {
  getAuth,
  getFirestore
} from "../lib/fabrica.js";
import {
    cod,
    muestraError
  } from "../lib/util.js";
  import {
    tieneRol
  } from "./seguridad.js";
  
  /** @type {HTMLUListElement} */
  const lista = document.
    querySelector("#lista");
  const daoLibro =
    getFirestore().
      collection("Libro");
  
  getAuth().
    onAuthStateChanged(
      protege, muestraError);
  
  /** @param {import(
      "../lib/tiposFire.js").User}
      usuario */
  async function protege(usuario) {
    if (tieneRol(usuario,
      ["Administrador"])) {
      consulta();
    }
  }
  
  function consulta() {
    daoLibro.
      orderBy("nombre")
      .onSnapshot(
        htmlLista, errConsulta);
  }
  
  /**
   * @param {import(
      "../lib/tiposFire.js").
      QuerySnapshot} snap */
  function htmlLista(snap) {
    let html = "";
    if (snap.size > 0) {
      snap.forEach(doc =>
        html += htmlFila(doc));
    } else {
      html += /* html */
        `<li class="vacio">
          -- No hay libros
          registrados. --
        </li>`;
    }
    lista.innerHTML = html;
  }
  
  /**
   * @param {import(
      "../lib/tiposFire.js").
      DocumentSnapshot} doc */
  function htmlFila(doc) {
    /**
     * @type {import("./tipos.js").
                    Alumno} */
    const data = doc.data();
    const isbn = cod(data.isbn);
    const nombre = cod(data.nombre);
    const autor = cod(data.autor);
    const editorial = cod(data.editorial);
    
    const parámetros =
      new URLSearchParams();
    parámetros.append("id", doc.id);
    return ( /* html */
      `<li>
        <a class="fila" href=
    "libro.html?${parámetros}">
          <strong class="primario">
            ${isbn} ${nombre} ${autor} ${editorial} 
          </strong>
        </a>
       
      </li>`);
  }
  
  /** @param {Error} e */
  function errConsulta(e) {
    muestraError(e);
    consulta();
  }
  
  
