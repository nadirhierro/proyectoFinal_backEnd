import express from "express";
import routerCart from "./routerCart/index.js";
import { routerProducts } from "./routerProducts/index.js";

const { Router } = express;

let routerApi = new Router();

routerApi.use("/cart", routerCart);
routerApi.use("/products", routerProducts);

export default routerApi;
