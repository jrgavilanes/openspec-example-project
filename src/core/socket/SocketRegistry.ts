export interface SocketMetadata {
  id: string;
  userId?: string;
  connectedAt: Date;
  rooms: Set<string>;
}

export class SocketRegistry {
  private static connections = new Map<string, SocketMetadata>();

  static register(id: string): SocketMetadata {
    const metadata: SocketMetadata = {
      id,
      connectedAt: new Date(),
      rooms: new Set(),
    };
    this.connections.set(id, metadata);
    return metadata;
  }

  static get(id: string): SocketMetadata | undefined {
    return this.connections.get(id);
  }

  static remove(id: string): boolean {
    return this.connections.delete(id);
  }

  static getAll(): SocketMetadata[] {
    return Array.from(this.connections.values());
  }

  static addToRoom(id: string, room: string) {
    const meta = this.get(id);
    if (meta) {
      meta.rooms.add(room);
    }
  }

  static removeFromRoom(id: string, room: string) {
    const meta = this.get(id);
    if (meta) {
      meta.rooms.delete(room);
    }
  }

  static getClientsInRoom(room: string): string[] {
    const clients: string[] = [];
    for (const [id, meta] of this.connections) {
      if (meta.rooms.has(room)) {
        clients.push(id);
      }
    }
    return clients;
  }
}
