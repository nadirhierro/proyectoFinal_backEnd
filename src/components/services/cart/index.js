import { cartDatabase } from "../../containers/daos/index.js";
import mailService from "../../../services/mailer.js";
import twilioService from "../../../services/twilio.js";

export default class cartService {
  constructor() {
    this.twilio = new twilioService();
    this.mailer = new mailService();
    this.carts = new cartDatabase();
  }

  async createCart(products, user) {
    try {
      let adminPhone = "+5491151804953";
      let create = await this.carts.createCart(products, user[0].email);
      await this.mailer.sendMailNewOrder(user[0], products);
      await this.twilio.newOrder(adminPhone, user[0].phone);
      return create;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteCart(id) {
    try {
      let deleted = await this.carts.deleteById(id);
      return deleted;
    } catch (err) {
      console.log(err);
    }
  }

  async getAll() {
    try {
      let allCarts = await this.carts.getAll();
      return allCarts;
    } catch (err) {
      console.log(err);
    }
  }

  async getCartProducts(id) {
    try {
      let products = await this.carts.getProducts(cartId);
      return products;
    } catch (err) {
      console.log(err);
    }
  }

  async addProduct(cartId, productId) {
    try {
      let added = await this.carts.addProduct(cartId, productId);
      return added;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteProduct(cartId, productId) {
    try {
      let deleted = await this.carts.deleteProduct(cartID, productID);
      return deleted;
    } catch (err) {
      console.log(err);
    }
  }
}
