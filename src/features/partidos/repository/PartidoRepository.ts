import { v4 as uuidv4 } from "uuid";
import { IPartidoRepository } from "../domain/IPartidoRepository";
import { Partido } from "../domain/Partido";

export class PartidoRepository implements IPartidoRepository {
  private partidos = new Map<string, Partido>();

  getAll(): Partido[] {
    return Array.from(this.partidos.values());
  }

  getById(id: string): Partido | undefined {
    return this.partidos.get(id);
  }

  create(name: string): Partido {
    const newPartido: Partido = {
      id: uuidv4(),
      name: name,
      numvotes: 0,
    };
    this.partidos.set(newPartido.id, newPartido);
    return newPartido;
  }

  delete(id: string): boolean {
    return this.partidos.delete(id);
  }

  update(partido: Partido): void {
    this.partidos.set(partido.id, partido);
  }
}
