import memoryContainer from "../../memoryContainer.js";
import memoryDaoProducts from "../productsContainer/memoryDaoProducts.js";

let Products = new memoryDaoProducts();

export default class memoryDaoCarts extends memoryContainer {
  constructor() {
    super();
  }

  createCart(products = []) {
    let newCart = this.save({ products: products });
    return newCart;
  }

  getProducts(cartId) {
    let cart = this.getById(cartId);
    if (cart) {
      return cart.products;
    } else {
      return { error: `No existe un carrito con id ${id}` };
    }
  }

  addProduct(cartId, productId) {
    let cart = this.getById(cartId);
    let productToAdd = Products.getById(Number(productId));
    if (productToAdd) {
      cart.products.push(productToAdd);
      this.change(cart);
      return cart;
    } else {
      return false;
    }
  }

  deleteProduct(cartId, productId) {
    let cart = this.getById(cartId);
    let productToDelete = cart.products.find(
      (product) => product._id == productId
    );
    if (productToDelete) {
      let index = cart.products.indexOf(productToDelete);
      cart.products.splice(index, 1);
      this.change(cart);
      return {
        state: `Producto con id ${productId} eleminado del carrito con id ${cartId}`,
      };
    } else {
      return {
        state: `No existe un producto con id ${productId} en el carrito ${cartId}`,
      };
    }
  }

  deleteCart(cartId) {
    let deleted = this.deleteById(cartId);
    if (deleted) {
      return { state: `Carrito con id ${cartId} eliminado` };
    } else {
      return { state: `No existe carrito con id ${cartId}` };
    }
  }
}
