import { addToCart } from "../services/Order.js";

export class ProductItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.getElementById('product-item-template');
    const content = template.content.cloneNode(true);

    this.appendChild(content);
    // grabbing the product dataset that we passed to this component
    const product = JSON.parse(this.dataset.product);

    const {name, price, image } = product;
    this.querySelector('h4').textContent = name;
    this.querySelector('.price').textContent = `$${price.toFixed(2)}`;
    this.querySelector('img').src = `data/images/${image}`; 
    this.querySelector('a').addEventListener('click', event => {
      // we only want the click to happen when target is button
      // currentTarget -> a
      // target -> button below
      // if we dont explicitly check it will click for entire <a>
      if (event.target.tagName.toLowerCase() == 'button') {
        addToCart(product.id);
      } else {
        myapp.router.go(`/product-${product.id}`);
      }
      event.preventDefault();

    })    
  }
};

customElements.define('product-item', ProductItem);