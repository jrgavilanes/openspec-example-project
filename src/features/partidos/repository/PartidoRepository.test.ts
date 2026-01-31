import { describe, expect, it, beforeEach } from "bun:test";
import { PartidoRepository } from "./PartidoRepository";

describe("PartidoRepository", () => {
  let repo: PartidoRepository;

  beforeEach(() => {
    repo = new PartidoRepository();
  });

  it("should create a new partido", () => {
    const partido = repo.create("Test Party");
    expect(partido.name).toBe("Test Party");
    expect(partido.id).toBeDefined();
    expect(partido.numvotes).toBe(0);
  });

  it("should get all partidos", () => {
    repo.create("Party 1");
    repo.create("Party 2");
    const all = repo.getAll();
    expect(all.length).toBe(2);
  });

  it("should get partido by id", () => {
    const created = repo.create("Target Party");
    const found = repo.getById(created.id);
    expect(found).toEqual(created);
  });

  it("should return undefined for non-existent id", () => {
    expect(repo.getById("non-existent")).toBeUndefined();
  });

  it("should delete a partido", () => {
    const created = repo.create("To Delete");
    const result = repo.delete(created.id);
    expect(result).toBe(true);
    expect(repo.getById(created.id)).toBeUndefined();
  });

  it("should return false when deleting non-existent partido", () => {
    expect(repo.delete("non-existent")).toBe(false);
  });

  it("should update a partido", () => {
    const partido = repo.create("To Update");
    partido.numvotes = 5;
    repo.update(partido);
    
    const updated = repo.getById(partido.id);
    expect(updated?.numvotes).toBe(5);
  });
});
