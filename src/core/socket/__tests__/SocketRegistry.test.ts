import { expect, test, describe, beforeEach } from "bun:test";
import { SocketRegistry } from "../SocketRegistry";

describe("SocketRegistry", () => {
  beforeEach(() => {
    // Reset registry by removing all (accessing private if necessary, 
    // but here we just use remove on known IDs)
    SocketRegistry.getAll().forEach(conn => SocketRegistry.remove(conn.id));
  });

  test("should register and retrieve a socket", () => {
    const id = "test-id";
    SocketRegistry.register(id);
    const meta = SocketRegistry.get(id);
    expect(meta).toBeDefined();
    expect(meta?.id).toBe(id);
  });

  test("should handle rooms", () => {
    const id = "test-id";
    SocketRegistry.register(id);
    SocketRegistry.addToRoom(id, "updates");
    
    const meta = SocketRegistry.get(id);
    expect(meta?.rooms.has("updates")).toBe(true);
    
    const clients = SocketRegistry.getClientsInRoom("updates");
    expect(clients).toContain(id);
  });

  test("should remove socket", () => {
    const id = "test-id";
    SocketRegistry.register(id);
    SocketRegistry.remove(id);
    expect(SocketRegistry.get(id)).toBeUndefined();
  });
});
