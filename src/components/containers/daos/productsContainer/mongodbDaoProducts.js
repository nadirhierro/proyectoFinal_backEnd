import mongodbContainer from "../../mongodbContainer.js";
import { productModel } from "../../../../models/index.js";

export default class mongodbDaoProducts extends mongodbContainer {
  constructor(model) {
    super(model);
    this.model = productModel;
  }

  async getByCategory(category) {
    try {
      let products = await this.model.find({ category: category });
      if (products) {
        return products;
      } else {
        return { error: "No existen productos para esa categoría" };
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getBysubategory(category, subcategory) {
    try {
      let products = await this.model.find({
        category: category,
        subcategory: subcategory
      });
      if (products) {
        return products;
      } else {
        return { error: "No existen productos para esa subcategoría" };
      }
    } catch (err) {
      console.log(err);
    }
  }

  async addProduct(product) {
    try {
      let validated = this.validate(product);
      if (validated) {
        let saved = await this.save(product);
        return { state: `Producto guardado con id ${saved}` };
      } else {
        return { state: `Información errónea, chequear data de producto` };
      }
    } catch (err) {
      console.log(err);
    }
  }

  async changeProduct(productId, productData) {
    try {
      let product = { id: productId, ...productData };
      let changed = await this.change(product);
      if (changed) {
        return { state: `Producto con id ${productId} cambiado` };
      } else {
        return { state: `No existe un producto con id ${productId}` };
      }
    } catch (err) {
      console.log(err);
    }
  }

  async deleteProduct(productId) {
    try {
      let deleted = await this.deleteById(productId);
      if (deleted) {
        return { state: `Producto con id ${productId} eliminado` };
      } else {
        return { state: `No existe un producto con id ${productId}` };
      }
    } catch (err) {
      console.log(err);
    }
  }

  async takeProduct(productId) {
    try {
    } catch (err) {
      console.log(err);
    }
  }
}
