import { describe, expect, it, beforeEach, mock } from "bun:test";
import { PartidoService } from "./PartidoService";
import { IPartidoRepository } from "../domain/IPartidoRepository";
import { Partido } from "../domain/Partido";

// Mock Repository
class MockRepository implements IPartidoRepository {
  partidos: Partido[] = [];
  
  getAll() { return this.partidos; }
  getById(id: string) { return this.partidos.find(p => p.id === id); }
  create(name: string) { 
    const p = { id: "1", name, numvotes: 0 };
    this.partidos.push(p);
    return p;
  }
  delete(id: string) { 
    const idx = this.partidos.findIndex(p => p.id === id);
    if (idx !== -1) {
        this.partidos.splice(idx, 1);
        return true;
    }
    return false;
  }
  update(partido: Partido) {
    const idx = this.partidos.findIndex(p => p.id === partido.id);
    if (idx !== -1) this.partidos[idx] = partido;
  }
}

describe("PartidoService", () => {
  let service: PartidoService;
  let mockRepo: MockRepository;

  beforeEach(() => {
    mockRepo = new MockRepository();
    service = new PartidoService(mockRepo);
  });

  it("should create a partido", () => {
    const partido = service.createPartido("Service Party");
    expect(partido.name).toBe("Service Party");
  });

  it("should throw error when creating without name", () => {
    expect(() => service.createPartido("")).toThrow("Name is required");
  });

  it("should vote for a partido", () => {
    const partido = service.createPartido("Vote Party");
    service.votePartido(partido.id);
    expect(mockRepo.getById(partido.id)?.numvotes).toBe(1);
  });

  it("should throw error when voting for non-existent partido", () => {
    expect(() => service.votePartido("non-existent")).toThrow("Partido not found");
  });

  it("should delete a partido", () => {
    const partido = service.createPartido("Delete Party");
    service.deletePartido(partido.id);
    expect(mockRepo.getById(partido.id)).toBeUndefined();
  });

  it("should throw error when deleting non-existent partido", () => {
    expect(() => service.deletePartido("non-existent")).toThrow("Partido not found");
  });
});
