import express from "express";
import productsController from "../../../components/controllers/productsController/index.js";

const { Router } = express;

const products = new productsController();

let routerProducts = new Router();

routerProducts.get("/:id?", products.getProduct);

routerProducts.get("/category/:categoryId?", products.getByCategory);

routerProducts.post("/", products.addProduct);

routerProducts.put("/:id", products.changeProduct);

routerProducts.delete("/:id", products.deleteProduct);

export default routerProducts;
