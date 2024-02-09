import API from "./API.js"; //put .js if this import doesnt work

export async function loadData() {
  myapp.store.menu = await API.fetchMenu();
}

export async function getProductById(productId) {
  if (myapp.store.menu === null) {
    await loadData();
  }
  for (const category of myapp.store.menu) {
    for (const product of category.products) {
      if (product.id === productId) {
        return product;
      }
    }
  };
  return null;
}