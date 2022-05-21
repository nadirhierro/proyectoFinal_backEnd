import cluster from "cluster";
import os from "os";
import { config } from "./src/config/index.js";
import { httpServer } from "./src/services/server.js";

const numCPUs = os.cpus().length;

// Si el parametro mode es FORK, se inicia el server en modo fork
// Si es CLUSTER, se inicia en modo cluster
if (config.mode == "FORK") {
  httpServer.listen(config.port, () => {});
  console.log(`Escuchando en puerto ${config.port}`);
} else if (config.mode == "CLUSTER") {
  if (cluster.isPrimary) {
    console.log(`Proceso principal ${process.pid} ejecutándose`);

    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    cluster.on("exit", (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} muerto`);
      cluster.fork();
    });
  } else {
    httpServer.listen(config.port, () => {});
    console.log(`Escuchando en puerto ${config.port} || Worker ${process.pid}`);
  }
}
