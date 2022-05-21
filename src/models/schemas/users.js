import Joi from "joi";

let email = Joi.string().email().required();
let password = Joi.object({
  iv: Joi.string(),
  content: Joi.string()
}).required();
let name = Joi.string().required();
let address = Joi.string().required();
let phone = Joi.number().required();
let age = Joi.number().required();
let avatar = Joi.string().required();
let isAdmin = Joi.boolean();

let userSchema = {
  email,
  password,
  name,
  age,
  address,
  phone,
  avatar,
  isAdmin
};

export default userSchema;
