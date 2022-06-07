import express from "express";
import cartController from "../../../components/controllers/cartsController/index.js";

const { Router } = express;

let routerCart = new Router();

let carts = new cartController();

routerCart.post("/", carts.createCart);

routerCart.delete("/:id", carts.deleteCart);

routerCart.get("/", carts.getAllCarts);

routerCart.get("/:id/products", carts.getProductsFromCart);

routerCart.post("/:id/products/:id__prod", carts.addProduct);

routerCart.delete("/:id/products/:id__prod", carts.deleteProduct);

export default routerCart;
