import Container from "../container/container.js";
import ProductsContainer from "../productsContainer/productsContainer.js";
import moment from "moment";

let Products = new ProductsContainer();

export default class CartContainer extends Container {
  constructor(fileName) {
    super(fileName);
    this.fileName = "./data/carts.json";
  }

  async createCart(products = []) {
    try {
      let newCart = await this.save({ products: products });
      return newCart;
    } catch (err) {
      return err;
    }
  }

  async getProducts(cartId) {
    try {
      let cart = await this.getById(cartId);
      if (cart) {
        return cart.products;
      } else {
        return { error: `No existe un carrito con id ${id}` };
      }
    } catch (err) {
      return err;
    }
  }

  async addProduct(cartId, productId) {
    try {
      let cart = await this.getById(cartId);
      let productToAdd = await Products.getById(productId);
      if (productToAdd) {
        cart.products.push(productToAdd);
        await this.change(cart);
        return cart;
      } else {
        return false;
      }
    } catch (err) {
      return err;
    }
  }

  async deleteProduct(cartId, productId) {
    try {
      let cart = await this.getById(cartId);
      let productToDelete = cart.products.find(
        (product) => product.id == productId
      );
      if (productToDelete) {
        let index = cart.products.indexOf(productToDelete);
        cart.products.splice(index, 1);
        await this.change(cart);
        return {
          state: `Producto con id ${productId} eleminado del carrito con id ${cartId}`,
        };
      } else {
        return {
          state: `No existe un producto con id ${productId} en el carrito ${cartId}`,
        };
      }
    } catch (err) {
      return err;
    }
  }

  async deleteCart(cartId) {
    try {
      let deleted = await this.deleteById(cartId);
      if (deleted) {
        return { state: `Carrito con id ${cartId} eliminado` };
      } else {
        return { state: `No existe carrito con id ${cartId}` };
      }
    } catch (err) {
      return err;
    }
  }
}
