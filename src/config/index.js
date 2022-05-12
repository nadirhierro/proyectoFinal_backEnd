import dotenv from "dotenv";
dotenv.config({ silent: true });

let config = {
  dev: process.env.NODE_ENV !== "production",
  port: process.env.PORT,
  cors: process.env.CORS,
  sessionSecret: process.env.SESSION_SECRET,
};

let db = {
  mongo_atlas: process.env.MONGO_ATLAS,
  advancedOptions: { useNewUrlParser: true, useUnifiedTopology: true },
};

export { config, db };
