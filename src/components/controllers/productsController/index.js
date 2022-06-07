import productService from "../../services/products";

const Products = new productService();
let admin = true;

export default class productsController {
  constructor() {}

  async getProduct(req, res, next) {
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
  }

  async getByCategory(req, res, next) {
    try {
      let categoryId = req.params.categoryId;
      let products = await Products.getByCategory(categoryId);
      res.json(products);
    } catch (err) {
      console.log(err);
    }
  }

  async addProduct(req, res, next) {
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
  }

  async changeProduct(req, res, next) {
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
  }

  async deleteProduct(req, res, next) {
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
  }
}
