import express from "express";
import ProductsContainer from "../../components/productsContainer/productsContainer.js";

const { Router } = express;

const products = new ProductsContainer();

let routerProductos = new Router();
let admin = true;

routerProductos.get("/:id?", async (req, res, next) => {
  try {
    let id = req.params.id;
    if (id) {
      let product = await products.getById(Number(id));
      res.json(product);
    } else {
      let allProducts = await products.getAll();
      res.json(allProducts);
    }
  } catch (err) {
    res.json(err);
  }
});

routerProductos.post("/", async (req, res, next) => {
  try {
    if (admin) {
      let product = req.body;
      let saved = await products.addProduct(product);
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

routerProductos.put("/:id", async (req, res, next) => {
  try {
    if (admin) {
      let id = req.params.id;
      let newData = req.body;
      let changed = await products.changeProduct(id, newData);
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

routerProductos.delete("/:id", async (req, res, next) => {
  try {
    if (admin) {
      let id = req.params.id;
      let deleted = await products.deleteProduct(Number(id));
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

export default routerProductos;