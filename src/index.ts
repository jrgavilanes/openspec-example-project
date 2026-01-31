import { PartidoRepository } from "./features/partidos/repository/PartidoRepository";
import { PartidoService } from "./features/partidos/service/PartidoService";
import { PartidoHandler } from "./features/partidos/delivery/PartidoHandler";

// Dependency Injection
const partidoRepo = new PartidoRepository();
const partidoService = new PartidoService(partidoRepo);
const partidoHandler = new PartidoHandler(partidoService);

const server = Bun.serve<{}>({
  fetch(req, server) {
    if (server.upgrade(req)) {
      return; // Upgrade successful
    }
    return new Response("Bun WebSocket Server", { status: 200 });
  },
  websocket: {
    open(ws) {
      partidoHandler.handleConnection(ws, server);
    },
    message(ws, message) {
      partidoHandler.handleMessage(ws, server, message);
    },
  },
});

console.log(`Listening on ${server.hostname}:${server.port}`);