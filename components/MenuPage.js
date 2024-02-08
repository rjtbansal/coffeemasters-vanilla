// web components are typically defined as classes as they need to extend from HTMLElement
// you could define them with functions but that would involve hacky prototype modification
export class MenuPage extends HTMLElement {
  constructor() {
    super();
  }
};
// this is how we are defining web component
customElements.define('menu-page', MenuPage);