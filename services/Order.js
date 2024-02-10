import { getProductById } from "./Menu.js";

export async function addToCart(productId) {
  const product = await getProductById(productId);
  
  // check if product exists in the cart
  const productFound = myapp.store.cart.find(cartProduct => (
    cartProduct.product.id == productId
  ));
  if (productFound) {
    // update the product quantity since we found it
    myapp.store.cart = myapp.store.cart.map(cartProduct => (
      cartProduct.product.id == productId ? 
        { ...cartProduct, quantity: cartProduct.quantity + 1 } :
      cartProduct  
    )) 
  } else {
    // product not found in cart yet so we add it
    myapp.store.cart = [...myapp.store.cart, { product, quantity: 1 }];
  }
}

export function removeFromCart(productId) {
  myapp.store.cart = myapp.store.cart.filter(cartProduct => (
    cartProduct.product.id != productId
  ));
}