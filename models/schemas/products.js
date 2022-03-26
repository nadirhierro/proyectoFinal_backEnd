import Joi from "joi";

let name = Joi.string().required();
let description = Joi.string().required();
let code = Joi.string().required();
let thumbnail = Joi.string().required();
let price = Joi.number().required();
let stock = Joi.number().required();

let productSchema = {
  name,
  description,
  code,
  thumbnail,
  price,
  stock,
};

export default productSchema;
