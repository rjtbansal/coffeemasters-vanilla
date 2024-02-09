/**
 * We are trying to mimick a global store we need to store our 
 * menu data and cart items
 */
const Store = {
  menu: null,
  cart: []
};

/**
 * Creating a proxy over our store. This will allow us to add an abstraction to set
 * properties or get properties over original object
 */
const ProxiedStore = new Proxy(Store, {
  set(target, property, value) {
    // since we are implementing store we are just setting values to target properties when there are changes detected
    target[property] = value;
    if (property === 'menu') {
      /**
       * we are dispatching event that menu has changed
       * We are attaching dispatch event to window object and not document because
       * we have both shadow DOM and regular DOM which means 2 documents in a way.
       * window object encompasses both!
       */
      window.dispatchEvent(new Event('appMenuChanged'));
    }
    if (property === 'cart') {
      window.dispatchEvent(new Event('appCartChanged'));
    }
  }
});

export default ProxiedStore;