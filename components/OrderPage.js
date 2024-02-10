export class OrderPage extends HTMLElement {

  // user is private object prefixed with # to identify as private
  #user = {
    name: '',
    phone: '',
    email: '',
  }

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
      
      //setting form bindings here
      // our form is in shadow DOM so dont try using document.querySelector
      this.setFormBindings(this.root.querySelector('form'));  
    }
  }

  setFormBindings(form) {
    /**
     * Instead of click we listen to submit so that user can be on any device
     * and hit the virtual keyboard go button or hit enter on desktop
     */
    form.addEventListener('submit', event => {
      event.preventDefault();
      alert(`You have submitted the form with name ${this.#user.name}, 
      phone ${this.#user.phone} and email ${this.#user.email}
      `);
      // clear the form after submitting
      this.#user.name = '';
      this.#user.email = '';
      this.#user.phone = '';
    });
    // set double data binding
    this.#user = new Proxy(this.#user, {
      set(target, property, value) {
        target[property] = value;
        /**You can access a particular form control in the returned collection by using either an index or the element's name or id attributes.
         * https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/elements
         */
        form.elements[property].value = value;
        return true;
      }
    });
    // below we are doing 2nd way data binding: when form changes also update value of objects
    // converting to array since form.elements returns HTMLFormsControlCollection which wont have forEach
    Array.from(form.elements).forEach(formElement => {
      // listening to when any form element changes
      formElement.addEventListener('change', () => {
        // once changes we update the value in our user object with form value
        this.#user[formElement.name] = formElement.value;
      });
    })
  }
}

customElements.define('order-page', OrderPage);