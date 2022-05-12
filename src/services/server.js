import express from "express";
import { createServer } from "http";
import { initSocket } from "./sockets.js";
import cors from "cors";
import { config } from "../config/index.js";
import router from "../routes/index.js";
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import { db } from "../config/index.js";

const app = express();
const httpServer = createServer(app);

const PORT = config.port;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));
app.use(cors(`${config.cors}`));

// Motor de plantilla - handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");

// Cookies y Session con passport
app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: db.mongo_atlas,
      mongoOptions: db.advancedOptions,
      autoRemove: "native",
    }),
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 600000,
    },
    secret: config.sessionSecret,
    rolling: true,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Router
app.use("/", router);

// Response para rutas no definidas
app.use("*", (req, res, next) => {
  res.json({
    error: `ruta ${req.params[0]} y método ${req.method} no implementada`,
  });
});

// Inicio Socket
initSocket(httpServer);

export { httpServer, PORT };
