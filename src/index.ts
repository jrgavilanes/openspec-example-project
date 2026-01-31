import { PartidoRepository } from "./features/partidos/repository/PartidoRepository";
import { PartidoService } from "./features/partidos/service/PartidoService";
import { PartidoHandler } from "./features/partidos/delivery/PartidoHandler";
import { SocketRegistry } from "./core/socket/SocketRegistry";
import { Logger, LogCategory } from "./core/utils/Logger";

// Dependency Injection
const partidoRepo = new PartidoRepository();
const partidoService = new PartidoService(partidoRepo);
const partidoHandler = new PartidoHandler(partidoService);

const server = Bun.serve<{ socketId: string }>({
  fetch(req, server) {
    const socketId = crypto.randomUUID();
    if (server.upgrade(req, { data: { socketId } })) {
      return; // Upgrade successful
    }
    return new Response("Bun WebSocket Server", { status: 200 });
  },
  websocket: {
    open(ws) {
      const { socketId } = ws.data;
      SocketRegistry.register(socketId);
      Logger.info(LogCategory.SYSTEM, "SOCKET_CONNECTED", { socketId });
      partidoHandler.handleConnection(ws, server);
    },
    async message(ws, message) {
      await partidoHandler.handleMessage(ws, message, server);
    },
    close(ws, code, reason) {
      const { socketId } = ws.data;
      Logger.info(LogCategory.SYSTEM, "SOCKET_DISCONNECTED", { 
        socketId, 
        metadata: { code, reason } 
      });
      SocketRegistry.remove(socketId);
      // Trigger cleanup in handlers if needed
    },
    drain(ws) {
      const { socketId } = ws.data;
      Logger.warn(LogCategory.SYSTEM, "SOCKET_DRAIN", { socketId });
    }
  },
});

console.log(`Listening on ${server.hostname}:${server.port}`);