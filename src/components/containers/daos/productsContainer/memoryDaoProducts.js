import memoryContainer from "../../memoryContainer.js";

export default class memoryDaoProducts extends memoryContainer {
  constructor() {
    super();
    this.container = [];
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

  addProduct(product) {
    let validated = this.validate(product);
    if (validated) {
      let saved = this.save(product);
      return { state: `Producto guardado con id ${saved}` };
    } else {
      return { state: `Información errónea, chequear data de producto` };
    }
  }

  changeProduct(productId, productData) {
    let validated = this.validate(productData);
    if (validated) {
      let product = { _id: productId, ...productData };
      let changed = this.change(product);
      if (changed) {
        return { state: `Producto con id ${productId} cambiado` };
      } else {
        return { state: `No existe un producto con id ${productId}` };
      }
    } else {
      return { state: `Información errónea, chequear data de producto` };
    }
  }

  deleteProduct(productId) {
    let deleted = this.deleteById(productId);
    if (deleted) {
      return { state: `Producto con id ${productId} eliminado` };
    } else {
      return { state: `No existe un producto con id ${productId}` };
    }
  }
}
