import { v4 as uuidv4 } from "uuid";

// Interfaces
export interface Partido {
  id: string;
  name: string;
  numvotes: number;
}

export type Action =
  | { action: "create"; name: string }
  | { action: "delete"; id: string }
  | { action: "vote"; id: string };

export type ResponseMessage =
  | { type: "update"; partidos: Partido[] }
  | { type: "error"; message: string };

// State
const partidos = new Map<string, Partido>();

const server = Bun.serve<{}>({
  fetch(req, server) {
    if (server.upgrade(req)) {
      return; // Upgrade successful
    }
    return new Response("Bun WebSocket Server", { status: 200 });
  },
  websocket: {
    open(ws) {
      // Subscribe to global updates
      ws.subscribe("updates");
      
      // Task 2.2: Send initial state
      sendUpdate(ws);
    },
    message(ws, message) {
      // Task 2.3: Dispatcher
      try {
        const text = typeof message === "string" ? message : new TextDecoder().decode(message);
        const data = JSON.parse(text) as Action;
        
        switch (data.action) {
          case "create":
            // Task 3.1: Create
            if (!data.name) {
                sendError(ws, "Name is required");
                return;
            }
            const newPartido: Partido = {
              id: uuidv4(),
              name: data.name,
              numvotes: 0,
            };
            partidos.set(newPartido.id, newPartido);
            broadcastUpdate(server); // Task 3.3
            break;

          case "delete":
            // Task 3.2: Delete
            if (partidos.has(data.id)) {
              partidos.delete(data.id);
              broadcastUpdate(server); // Task 3.3
            } else {
                sendError(ws, "Partido not found");
            }
            break;

          case "vote":
            // Task 4.1: Vote
            const partido = partidos.get(data.id);
            if (partido) {
              partido.numvotes++;
              broadcastUpdate(server); // Task 4.3
            } else {
              // Task 4.2: Error handling
              sendError(ws, "Partido not found");
            }
            break;

          default:
            sendError(ws, "Unknown action");
        }
      } catch (e) {
        sendError(ws, "Invalid JSON");
      }
    },
  },
});

function sendUpdate(ws: any) {
  const response: ResponseMessage = {
    type: "update",
    partidos: Array.from(partidos.values()),
  };
  ws.send(JSON.stringify(response));
}

function sendError(ws: any, message: string) {
    const response: ResponseMessage = {
        type: "error",
        message
    };
    ws.send(JSON.stringify(response));
}

function broadcastUpdate(server: any) {
  const response: ResponseMessage = {
    type: "update",
    partidos: Array.from(partidos.values()),
  };
  server.publish("updates", JSON.stringify(response));
}

console.log(`Listening on ${server.hostname}:${server.port}`);
