import express from "express";
import { cartDatabase } from "../../components/containers/daos/index.js";

const { Router } = express;

let routerCart = new Router();

let carts = new cartDatabase();

routerCart.post("/", async (req, res, next) => {
  try {
    let create = await carts.createCart([]);
    res.json(create);
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
