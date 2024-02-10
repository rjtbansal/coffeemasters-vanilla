// web components are typically defined as classes as they need to extend from HTMLElement
// you could define them with functions but that would involve hacky prototype modification
export class MenuPage extends HTMLElement {
  constructor() {
    super();

    /* we are creating shadow DOM for this component. This separates it from 
    real DOM. mode: open ensures that outside DOM has access to this DOM

    This is critical for us to keep styling of this component scoped to itself

    Without this, if you try to give say an h2 from this element a particular CSS,
    and globally there is another h2 where this component is being used we may see
    that one being overridden 
     */
    this.root = this.attachShadow({ mode: 'open' });
    const styles = document.createElement('style');
    this.root.appendChild(styles);

    async function loadCSS() {
      const request = await fetch('/components/MenuPage.css');
      const css = await request.text();
      styles.textContent = css;
    }
    loadCSS();
  }
  
  // this lifecycle method is called when component has been attached to the DOM
  connectedCallback() {
    const template = document.getElementById('menu-page-template');

    // passing true to cloneNode just means we want deep copy of the template content so also nested elements that are there in the template
    const content = template.content.cloneNode(true);
    // add this clone as a child of the root of this component
    this.root.appendChild(content);
    // now we are listening to our own event that we created for store
    window.addEventListener('appMenuChanged', () => {
      this.render();
    });
    // also rendering when menu has not changed but we are trying to navigate back to that page
    this.render();
  }

  render() {
    if (myapp.store.menu) {
      // always cleanup innerHTML because we are setting it in else
      this.root.querySelector('#menu').innerHTML = '';
      for (let category of myapp.store.menu) {
        const liCategory = document.createElement('li');
        liCategory.innerHTML = `
        <h3>${category.name}</h3>
        <ul class='category'>
        
        </ul>
        `;
        this.root.querySelector('#menu').appendChild(liCategory);

        category.products.forEach(product => {
          // we are using our custom web component called product-item here
          const item = document.createElement('product-item');
          // sending stringified JSON to our component as data-product
          item.dataset.product = JSON.stringify(product);
          liCategory.querySelector('.category').appendChild(item);
        })
      }
    } 
    else {
      this.root.querySelector('#menu').innerHTML = 'Loading....';
    }
  }
};
// this is how we are defining web component
customElements.define('menu-page', MenuPage);