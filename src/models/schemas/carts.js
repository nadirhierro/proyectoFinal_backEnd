import Joi from "joi";
import productSchema from "./products.js";

let products = Joi.array()
  .items(
    Joi.object({
      productSchema
    })
  )
  .required();
let user = Joi.string().required();

let cartSchema = { products, user };

export default cartSchema;
