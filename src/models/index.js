import mongoose from "../config/mongoDB.js";
import productSchema from "./schemas/products.js";
import cartSchema from "./schemas/carts.js";
import userSchema from "./schemas/users.js";

const { Schema, model } = mongoose;

let ProductSchema = new Schema(productSchema);
let productModel = new model("products", ProductSchema);

let CartSchema = new Schema(cartSchema);
let cartModel = new model("carts", CartSchema);

let UserSchema = new Schema(userSchema);
let userModel = new model("users", UserSchema);

export { productModel, cartModel, userModel };
