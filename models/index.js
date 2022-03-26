import mongoose from "../config/mongoDB.js";
import productSchema from "./schemas/products.js";
import cartSchema from "./schemas/carts.js";

const { Schema, model } = mongoose;

let ProductSchema = new Schema(productSchema);
let productModel = new model("products", ProductSchema);

let CartSchema = new Schema(cartSchema);
let cartModel = new model("carts", CartSchema);

export { productModel, cartModel };
