import { httpServer, PORT } from "./src/services/server.js";

httpServer.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
