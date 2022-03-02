import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import config from "./config/index.js";
import routerProducts from "./routes/routerProducts/routerProducts.js";
import routerCart from "./routes/routerCart/routerCart.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const PORT = config.port;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api/products", routerProducts);
app.use("/api/cart", routerCart);

// Response para rutas no definidas
app.use("*", (req, res, next) => {
  res.json({
    error: `ruta ${req.params[0]} y método ${req.method} no implementada`,
  });
});

//Sockets
io.on("connection", (socket) => {
  // Cuando alguien se conecta el socket envía señal para actualizar productos y carritos
  socket.emit("products", "actualizar");
  socket.emit("carts", "actualizar");

  // Cuando el front avisa que se agregó un producto
  // el back le avisa a todos los sockets que actualicen el producto
  socket.on("products", (data) => {
    io.sockets.emit("products", "actualizar");
  });

  // Idem para carts
  // cada vez que un user avisa por socket, este le avisa a todos que actualicen
  socket.on("carts", (data) => {
    io.sockets.emit("carts", "actualizar");
  });
});

httpServer.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
