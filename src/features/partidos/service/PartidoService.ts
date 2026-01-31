import { IPartidoRepository } from "../domain/IPartidoRepository";
import { Partido } from "../domain/Partido";
import { AppError } from "../../../core/errors/AppError";

export class PartidoService {
  constructor(private repo: IPartidoRepository) {}

  getAllPartidos(): Partido[] {
    return this.repo.getAll();
  }

  createPartido(name: string): Partido {
    if (!name) {
      throw new AppError("Name is required", 400, "VALIDATION_ERROR");
    }
    return this.repo.create(name);
  }

  deletePartido(id: string): void {
    const deleted = this.repo.delete(id);
    if (!deleted) {
      throw new AppError(`Partido with id ${id} not found`, 404, "RESOURCE_NOT_FOUND");
    }
  }

  votePartido(id: string): void {
    const partido = this.repo.getById(id);
    if (!partido) {
      throw new AppError(`Partido with id ${id} not found`, 404, "RESOURCE_NOT_FOUND");
    }
    partido.numvotes++;
    this.repo.update(partido);
  }
}
