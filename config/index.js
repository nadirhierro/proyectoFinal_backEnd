import dotenv from "dotenv";
dotenv.config({ silent: true });

let config = {
  dev: process.env.NODE_ENV !== "production",
  port: process.env.PORT,
  cors: process.env.CORS,
};

let db = {
  mongo_atlas: process.env.MONGO_ATLAS,
};

export { config, db };
