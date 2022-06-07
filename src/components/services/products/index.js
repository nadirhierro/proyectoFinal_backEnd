import { productDatabase } from "../../containers/daos/index.js";

export default class productService {
  constructor() {
    this.products = new productDatabase();
  }

  async getById(id) {
    try {
      let product = await this.products.getById(id);
      return product;
    } catch (err) {
      console.log(err);
    }
  }

  async getAll() {
    try {
      let allProducts = await this.products.getAll();
      return allProducts;
    } catch (err) {
      console.log(err);
    }
  }

  async getByCategory(categoryId) {
    try {
      let products = await this.products.getByCategory(categoryId);
      return products;
    } catch (err) {
      console.log(err);
    }
  }

  async addProduct(product) {
    try {
      let saved = await this.products.addProduct(product);
      return saved;
    } catch (err) {
      console.log(err);
    }
  }

  async changeProduct(id, newData) {
    try {
      let changed = await this.products.changeProduct(id, newData);
      return changed;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteProduct(id) {
    try {
      let deleted = await this.products.deleteProduct(id);
      return deleted;
    } catch (err) {
      console.log(err);
    }
  }
}
