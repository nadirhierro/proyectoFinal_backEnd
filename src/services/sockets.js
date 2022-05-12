import { Server } from "socket.io";

let io;

const initSocket = (server) => {
  io = new Server(server);

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

  return io;
};

const getSocket = () => {
  return io;
};

export { initSocket, getSocket };
