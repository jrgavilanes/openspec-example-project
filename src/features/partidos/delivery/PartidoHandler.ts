import { ServerWebSocket, Server } from "bun";
import { PartidoService } from "../service/PartidoService";
import { Partido } from "../domain/Partido";
import { PartidoActionSchema } from "./PartidoSchemas";
import { AppError } from "../../../core/errors/AppError";
import { safeHandle } from "../../../core/socket/safeHandle";

// Shared Types
export type ResponseMessage =
  | { type: "update"; success: true; partidos: Partido[] }
  | { type: "error"; success: false; message: string };

export class PartidoHandler {
  constructor(private service: PartidoService) {}

  handleConnection(ws: ServerWebSocket<{ socketId: string }>, server: Server) {
    ws.subscribe("updates");
    this.sendUpdate(ws);
  }

  handleMessage = safeHandle<{ socketId: string }>(
    async (ws: ServerWebSocket<{ socketId: string }>, message: string | Buffer) => {
      let data;
      const text = typeof message === "string" ? message : new TextDecoder().decode(message);
      
      try {
        data = JSON.parse(text);
      } catch (e) {
        throw new AppError("Invalid JSON format", 400, "VALIDATION_ERROR");
      }

      const action = PartidoActionSchema.parse(data);

      switch (action.action) {
        case "create":
          await this.service.createPartido(action.name);
          this.broadcastUpdate(ws, server);
          break;

        case "delete":
          await this.service.deletePartido(action.id);
          this.broadcastUpdate(ws, server);
          break;

        case "vote":
          await this.service.votePartido(action.id);
          this.broadcastUpdate(ws, server);
          break;
      }
    }
  );

  private sendUpdate(ws: ServerWebSocket<{ socketId: string }>) {
    const response: ResponseMessage = {
      type: "update",
      success: true,
      partidos: this.service.getAllPartidos(),
    };
    ws.send(JSON.stringify(response));
  }

  private broadcastUpdate(ws: ServerWebSocket<{ socketId: string }>, server: Server) {
    const response: ResponseMessage = {
      type: "update",
      success: true,
      partidos: this.service.getAllPartidos(),
    };
    server.publish("updates", JSON.stringify(response));
  }
}
