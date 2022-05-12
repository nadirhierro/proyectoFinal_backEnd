import mongoose from "mongoose";
import { db } from "./index.js";

const MONGO_ATLAS = `${db.mongo_atlas}`;

let connection;
(async () => {
  try {
    connection = await mongoose.connect(MONGO_ATLAS, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(error);
  }
})();

export default mongoose;
