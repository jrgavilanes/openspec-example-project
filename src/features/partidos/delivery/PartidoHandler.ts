import { PartidoService } from "../service/PartidoService";
import { Partido } from "../domain/Partido";

// Shared Types (can be moved to a shared/types.ts later if needed, but keeping local for now or reusing existing if possible, but existing are in index.ts. Let's redefine for clean separation or import if we extract them.)
// For now, I'll redefine them to break dependency on index.ts types.
export type Action =
  | { action: "create"; name: string }
  | { action: "delete"; id: string }
  | { action: "vote"; id: string };

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
    try {
      const text = typeof message === "string" ? message : new TextDecoder().decode(message);
      const data = JSON.parse(text) as Action;

      switch (data.action) {
        case "create":
          try {
            this.service.createPartido(data.name);
            this.broadcastUpdate(server);
          } catch (e: any) {
            this.sendError(ws, e.message);
          }
          break;

        case "delete":
          try {
            this.service.deletePartido(data.id);
            this.broadcastUpdate(server);
          } catch (e: any) {
             this.sendError(ws, e.message);
          }
          break;

        case "vote":
          try {
            this.service.votePartido(data.id);
            this.broadcastUpdate(server);
          } catch (e: any) {
             this.sendError(ws, e.message);
          }
          break;

        default:
          this.sendError(ws, "Unknown action");
      }
    } catch (e) {
      this.sendError(ws, "Invalid JSON");
    }
  }

  private sendUpdate(ws: any) {
    const response: ResponseMessage = {
      type: "update",
      partidos: this.service.getAllPartidos(),
    };
    ws.send(JSON.stringify(response));
  }

  private sendError(ws: any, message: string) {
    const response: ResponseMessage = {
      type: "error",
      message,
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
