class MiFooter
  extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `<p>
        &copy; 2021
        Brandon Hernandez Rocha.
      </p>`;
  }
}

customElements.define(
  "mi-footer", MiFooter);
