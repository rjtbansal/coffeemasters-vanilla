export class OrderPage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: 'open' });
    const styles = document.createElement('style');
    this.root.appendChild(styles);

    const section = document.createElement('section');
    this.root.appendChild(section);

    async function loadCSS() {
      const request = await fetch('/components/OrderPage.css');
      styles.textContent = await request.text();
    }
    loadCSS();
  }

  connectedCallback() {
    window.addEventListener('appCartChanged', () => {
      this.render();
    });

    this.render();
  }

  render() {
    let section = this.root.querySelector("section");
    if (myapp.store.cart.length == 0) {
      section.innerHTML = `
          <p class="empty">Your order is empty</p>
      `;
    } else {
      let html = `
          <h2>Your Order</h2>
          <ul>
          </ul>
      `;
      section.innerHTML = html;

      const template = document.getElementById("order-form-template");
      const content = template.content.cloneNode(true);
      section.appendChild(content);

      let total = 0;

      for (const productInCart of myapp.store.cart) {
        const item = document.createElement('cart-item');
        item.dataset.item = JSON.stringify(productInCart);
        this.root.querySelector('ul').appendChild(item);
        total += productInCart.quantity * productInCart.product.price;
      }
      this.root.querySelector("ul").innerHTML += `
            <li>
                <p class='total'>Total</p>
                <p class='price-total'>$${total.toFixed(2)}</p>
            </li>                
        `;  
    }
  }
}

customElements.define('order-page', OrderPage);