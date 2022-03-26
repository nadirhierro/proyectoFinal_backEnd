import firebaseDaoCarts from "./cartsContainer/firebaseDaoCarts.js";
import firebaseDaoProducts from "./productsContainer/firebaseDaoProducts.js";
import mongodbDaoCarts from "./cartsContainer/mongodbDaoCarts.js";
import mongodbDaoProducts from "./productsContainer/mongodbDaoProducts.js";
import fileDaoCarts from "./cartsContainer/fileDaoCarts.js";
import fileDaoProducts from "./productsContainer/fileDaoProducts.js";
import memoryDaoCarts from "./cartsContainer/memoryDaoCarts.js";
import memoryDaoProducts from "./productsContainer/memoryDaoProducts.js";
import dotenv from "dotenv";

dotenv.config({ silent: true });

const container_type = process.env.npm_config_container_type
  ? process.env.npm_config_container_type
  : "file";

let cartDatabase;
let productDatabase;

if (container_type == "file") {
  cartDatabase = fileDaoCarts;
  productDatabase = fileDaoProducts;
} else if (container_type == "firebase") {
  cartDatabase = firebaseDaoCarts;
  productDatabase = firebaseDaoProducts;
} else if (container_type == "mongodb") {
  cartDatabase = mongodbDaoCarts;
  productDatabase = mongodbDaoProducts;
} else if (container_type == "memory") {
  cartDatabase = memoryDaoCarts;
  productDatabase = memoryDaoProducts;
}

export { cartDatabase, productDatabase };
