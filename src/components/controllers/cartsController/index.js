import cartService from "../../services/cart/index.js";

let carts = new cartService();

export default class cartController {
  constructor() {}

  async createCart(req, res, next) {
    try {
      let user = await req.user;
      let products = req.body;
      let create = await carts.createCart(products, user);
      res.json({ cart: create, name: user[0].name });
    } catch (err) {
      res.json(err);
    }
  }

  async deleteCart(req, res, next) {
    try {
      let id = req.params.id;
      let deleted = await carts.deleteCart(id);
      res.json(deleted);
    } catch (err) {
      res.json(err);
    }
  }

  async getAllCarts(req, res, next) {
    try {
      let allCarts = await carts.getAll();
      res.json(allCarts);
    } catch (err) {
      res.json(err);
    }
  }

  async getProductsFromCart(req, res, next) {
    try {
      let cartId = req.params.id;
      let products = await carts.getProducts(cartId);
      res.json(products);
    } catch (err) {
      res.json(err);
    }
  }

  async addProduct(req, res, next) {
    try {
      let cartId = req.params.id;
      let productId = req.params.id__prod;
      let added = await carts.addProduct(cartId, productId);
      res.json(added);
    } catch (err) {
      res.json(err);
    }
  }

  async deleteProduct(req, res, next) {
    try {
      let cartID = req.params.id;
      let productID = req.params.id__prod;
      let deleted = await carts.deleteProduct(cartID, productID);
      res.json(deleted);
    } catch (err) {
      res.json(err);
    }
  }
}
