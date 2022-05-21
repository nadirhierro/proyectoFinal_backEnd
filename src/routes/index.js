import express from "express";
import routerHome from "./routerHome/index.js";
import routerApi from "./routerApi/index.js";

const { Router } = express;

const router = new Router();

router.use("/api", routerApi);
router.use("/", routerHome);

export default router;
