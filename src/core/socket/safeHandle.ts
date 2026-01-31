import { ServerWebSocket, Server } from "bun";
import { handleError } from "../errors/ErrorHandler";

export function safeHandle<T extends { socketId: string }>(
  handler: (ws: ServerWebSocket<T>, message: string | Buffer, server: Server) => Promise<void> | void
) {
  return async (ws: ServerWebSocket<T>, message: string | Buffer, server: Server) => {
    try {
      await handler(ws, message, server);
    } catch (error) {
      handleError(ws, error);
    }
  };
}
