import { ServerWebSocket } from "bun";
import { handleError } from "../errors/ErrorHandler";
import { Logger, LogCategory } from "../utils/Logger";

export function safeHandle<T extends { socketId: string }>(
  handler: (ws: ServerWebSocket<T>, message: string | Buffer) => Promise<void> | void
) {
  return async (ws: ServerWebSocket<T>, message: string | Buffer) => {
    try {
      await handler(ws, message);
    } catch (error) {
      handleError(ws, error);
    }
  };
}
