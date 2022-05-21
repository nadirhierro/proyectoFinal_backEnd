import mongodbContainer from "../../mongodbContainer.js";
import mongodbDaoProducts from "../productsContainer/mongodbDaoProducts.js";
import { cartModel } from "../../../../models/index.js";

let Products = new mongodbDaoProducts();

export default class mongodbDaoCarts extends mongodbContainer {
  constructor(model) {
    super(model);
    this.model = cartModel;
  }

  async createCart(products = [], user) {
    try {
      let newCart = await this.save({ products: products, user: user });
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
        (product) => product._id == productId
      );
      console.log(productToDelete);
      if (productToDelete) {
        let index = cart.products.indexOf(productToDelete);
        cart.products.splice(index, 1);
        await this.change(cart);
        return {
          state: `Producto con id ${productId} eleminado del carrito con id ${cartId}`
        };
      } else {
        return {
          state: `No existe un producto con id ${productId} en el carrito ${cartId}`
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
