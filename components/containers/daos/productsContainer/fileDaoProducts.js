import fileContainer from "../../fileContainer.js";

export default class fileDaoProducts extends fileContainer {
  constructor(fileName) {
    super(fileName);
    this.fileName = "./data/products.json";
  }

  validate(product) {
    if (
      product.name &&
      product.thumbnail &&
      product.description &&
      product.code &&
      product.price &&
      product.stock
    ) {
      console.log(product.thumbnail);
      return true;
    } else {
      return false;
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
      return err;
    }
  }

  async changeProduct(productId, productData) {
    try {
      let validated = this.validate(productData);
      if (validated) {
        let product = { id: productId, ...productData };
        let changed = await this.change(product);
        if (changed) {
          return { state: `Producto con id ${productId} cambiado` };
        } else {
          return { state: `No existe un producto con id ${productId}` };
        }
      } else {
        return { state: `Información errónea, chequear data de producto` };
      }
    } catch (err) {
      return err;
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
      return err;
    }
  }
}
