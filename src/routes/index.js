import express from "express";
import routerHome from "./routerHome/index.js";
import { routerProducts } from "./routerProducts/routerProducts.js";
import routerCart from "./routerCart/routerCart.js";

const { Router } = express;

const router = new Router();

router.use("/api/cart", routerCart);
router.use("/api/products", routerProducts);
router.use("/", routerHome);

export default router;
