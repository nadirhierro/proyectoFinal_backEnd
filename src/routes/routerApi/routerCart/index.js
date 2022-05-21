import express from "express";
import { cartDatabase } from "../../../components/containers/daos/index.js";
import { sendMailNewOrder } from "../../../services/sendMail.js";
import sendMessage from "../../../services/twilio.js";

const { Router } = express;

let routerCart = new Router();

let carts = new cartDatabase();

let adminPhone = "+5491151804953";

routerCart.post("/", async (req, res, next) => {
  try {
    let user = await req.user;
    let products = req.body;
    let create = await carts.createCart(products, user[0].email);
    let mail = await sendMailNewOrder(user[0], products);
    let whatsappAdmin = await sendMessage("New order", adminPhone);
    let whatsappUser = await sendMessage("New order in process", user[0].phone);
    res.json({ cart: create, name: user[0].name });
  } catch (err) {
    res.json(err);
  }
});

routerCart.delete("/:id", async (req, res, next) => {
  try {
    let id = req.params.id;
    let deleted = await carts.deleteById(id);
    res.json(deleted);
  } catch (err) {
    res.json(err);
  }
});

routerCart.get("/", async (req, res, next) => {
  try {
    let allCarts = await carts.getAll();
    res.json(allCarts);
  } catch (err) {
    res.json(err);
  }
});

routerCart.get("/:id/products", async (req, res, next) => {
  try {
    let cartId = req.params.id;
    let products = await carts.getProducts(cartId);
    res.json(products);
  } catch (err) {
    res.json(err);
  }
});

routerCart.post("/:id/products/:id__prod", async (req, res, next) => {
  try {
    let cartId = req.params.id;
    let productId = req.params.id__prod;
    let added = await carts.addProduct(cartId, productId);
    res.json(added);
  } catch (err) {
    res.json(err);
  }
});

routerCart.delete("/:id/products/:id__prod", async (req, res, next) => {
  try {
    let cartID = req.params.id;
    let productID = req.params.id__prod;
    let deleted = await carts.deleteProduct(cartID, productID);
    res.json(deleted);
  } catch (err) {
    res.json(err);
  }
});

export default routerCart;
