import { IPartidoRepository } from "../domain/IPartidoRepository";
import { Partido } from "../domain/Partido";

export class PartidoService {
  constructor(private repo: IPartidoRepository) {}

  getAllPartidos(): Partido[] {
    return this.repo.getAll();
  }

  createPartido(name: string): Partido {
    if (!name) {
      throw new Error("Name is required");
    }
    return this.repo.create(name);
  }

  deletePartido(id: string): void {
    const deleted = this.repo.delete(id);
    if (!deleted) {
      throw new Error("Partido not found");
    }
  }

  votePartido(id: string): void {
    const partido = this.repo.getById(id);
    if (!partido) {
      throw new Error("Partido not found");
    }
    partido.numvotes++;
    this.repo.update(partido);
  }
}
