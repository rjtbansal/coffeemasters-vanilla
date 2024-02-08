// web components are typically defined as classes as they need to extend from HTMLElement
// you could define them with functions but that would involve hacky prototype modification
export class MenuPage extends HTMLElement {
  constructor() {
    super();
  }
  
  // this lifecycle method is called when component has been attached to the DOM
  connectedCallback() {
    const template = document.getElementById('menu-page-template');

    // passing true to cloneNode just means we want deep copy of the template content so also nested elements that are there in the template
    const content = template.content.cloneNode(true);
    // add this clone as a child of this component
    this.appendChild(content);
  
  }
};
// this is how we are defining web component
customElements.define('menu-page', MenuPage);