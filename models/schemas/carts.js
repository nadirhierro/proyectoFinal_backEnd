import Joi from "joi";
import productSchema from "./products.js";

let products = Joi.array()
  .items(
    Joi.object({
      productSchema,
    })
  )
  .required();

let cartSchema = { products };

export default cartSchema;
