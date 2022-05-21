import dotenv from "dotenv";
import _yargs from "yargs";
dotenv.config({ silent: true });

// Yargs
const yargs = _yargs(process.argv.slice(2));

// Seteo el puerto default y limpio los args
const args = yargs.default({
  port: process.env.PORT,
  mode: process.env.MODE,
}).argv;
delete args["_"];
delete args["$0"];

let config = {
  dev: process.env.NODE_ENV !== "production",
  port: args.port,
  mode: args.mode,
  cors: process.env.CORS,
  sessionSecret: process.env.SESSION_SECRET,
};

let cryptoConfig = {
  alogrithm: process.env.CRYPTO_ALGORITHM,
  secretkey: process.env.CRYPTO_SECRET,
};

let db = {
  mongo_atlas: process.env.MONGO_ATLAS,
  crypto: process.env.MONGO_ENCRYPT,
  advancedOptions: { useNewUrlParser: true, useUnifiedTopology: true },
};

let twilioConfig = {
  sid: process.env.TWILIO_SID,
  token: process.env.TWILIO_TOKEN,
};

export { config, cryptoConfig, db, twilioConfig };
