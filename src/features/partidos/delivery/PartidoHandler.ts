import { PartidoService } from "../service/PartidoService";
import { Partido } from "../domain/Partido";
import { PartidoActionSchema } from "./PartidoSchemas";
import { AppError } from "../../../core/errors/AppError";

// Shared Types
// ResponseMessage is still needed for outgoing messages
export type ResponseMessage =
  | { type: "update"; partidos: Partido[] }
  | { type: "error"; message: string };

export class PartidoHandler {
  constructor(private service: PartidoService) {}

  handleConnection(ws: any, server: any) {
    ws.subscribe("updates");
    this.sendUpdate(ws);
  }

  handleMessage(ws: any, server: any, message: any) {
    let data;
    try {
      const text = typeof message === "string" ? message : new TextDecoder().decode(message);
      data = JSON.parse(text);
    } catch (e) {
      throw new AppError("Invalid JSON format", 400, "VALIDATION_ERROR");
    }

    const action = PartidoActionSchema.parse(data);

    switch (action.action) {
      case "create":
        this.service.createPartido(action.name);
        this.broadcastUpdate(server);
        break;

      case "delete":
        this.service.deletePartido(action.id);
        this.broadcastUpdate(server);
        break;

      case "vote":
        this.service.votePartido(action.id);
        this.broadcastUpdate(server);
        break;
    }
  }

  private sendUpdate(ws: any) {
    const response: ResponseMessage = {
      type: "update",
      partidos: this.service.getAllPartidos(),
    };
    ws.send(JSON.stringify(response));
  }

  private broadcastUpdate(server: any) {
    const response: ResponseMessage = {
      type: "update",
      partidos: this.service.getAllPartidos(),
    };
    server.publish("updates", JSON.stringify(response));
  }
}
