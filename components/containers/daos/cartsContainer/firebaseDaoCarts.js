import firebaseContainer from "../../firebaseContainer.js";
import firebaseDaoProducts from "../productsContainer/firebaseDaoProducts.js";

let Products = new firebaseDaoProducts();

export default class firebaseDaoCarts extends firebaseContainer {
  constructor(collectionName) {
    super(collectionName);
    this.collectionName = "carts";
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
        cart.products.push({ _id: productId, ...productToAdd });
        let newCart = { id: cartId, ...cart };
        await this.change(newCart);
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
      console.log("si");
      let cart = await this.getById(cartId);
      let productToDelete = cart.products.find(
        (product) => product._id == productId
      );
      if (productToDelete) {
        let index = cart.products.indexOf(productToDelete);
        cart.products.splice(index, 1);
        let newCart = { id: cartId, ...cart };
        await this.change(newCart);
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
