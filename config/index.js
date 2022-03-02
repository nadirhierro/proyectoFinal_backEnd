import dotenv from "dotenv";
dotenv.config({ silent: true });

let config = {
  dev: process.env.NODE_ENV !== "production",
  port: process.env.PORT,
};

export default config ;