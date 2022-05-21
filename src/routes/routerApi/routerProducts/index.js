import express from "express";
import { productDatabase } from "../../../components/containers/daos/index.js";

const { Router } = express;

const Products = new productDatabase();

let routerProducts = new Router();
let admin = true;

routerProducts.get("/:id?", async (req, res, next) => {
  try {
    let id = req.params.id;
    if (id) {
      let product = await Products.getById(id);
      res.json(product);
    } else {
      let allProducts = await Products.getAll();
      res.json(allProducts);
    }
  } catch (err) {
    res.json(err);
    console.log("no");
  }
});

routerProducts.get("/category/:categoryId?", async (req, res, next) => {
  try {
    let categoryId = req.params.categoryId;
    let products = await Products.getByCategory(categoryId);
    res.json(products);
  } catch (err) {
    console.log(err);
  }
});

routerProducts.post("/", async (req, res, next) => {
  try {
    if (admin) {
      let product = req.body;
      let saved = await Products.addProduct(product);
      res.json(saved);
    } else {
      res.json({
        error: -1,
        descripcion: "ruta '/' método 'POST' no autorizada",
      });
    }
  } catch (err) {
    res.json(err);
  }
});

routerProducts.put("/:id", async (req, res, next) => {
  try {
    if (admin) {
      let id = req.params.id;
      let newData = req.body;
      let changed = await Products.changeProduct(id, newData);
      res.json(changed);
    } else {
      res.json({
        error: -1,
        descripcion: "ruta '/' método 'PUT' no autorizada",
      });
    }
  } catch (err) {
    res.json(err);
  }
});

routerProducts.delete("/:id", async (req, res, next) => {
  try {
    if (admin) {
      let id = req.params.id;
      let deleted = await Products.deleteProduct(id);
      res.json(deleted);
    } else {
      res.json({
        error: -1,
        descripcion: "ruta '/' método 'DELETE' no autorizada",
      });
    }
  } catch (err) {
    res.json(err);
  }
});

export { routerProducts, Products };
