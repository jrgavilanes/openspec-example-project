import { IPartidoRepository } from "../domain/IPartidoRepository";
import { Partido } from "../domain/Partido";
import { AppError } from "../../../core/errors/AppError";
import { Logger, LogCategory } from "../../../core/utils/Logger";

export class PartidoService {
  constructor(private repo: IPartidoRepository) {}

  getAllPartidos(): Partido[] {
    return this.repo.getAll();
  }

  createPartido(name: string): Partido {
    if (!name) {
      throw new AppError("Name is required", 400, "VALIDATION_ERROR");
    }
    const partido = this.repo.create(name);
    Logger.info(LogCategory.VOTING, "PARTIDO_CREATED", { 
      metadata: { id: partido.id, name: partido.name } 
    });
    return partido;
  }

  deletePartido(id: string): void {
    const deleted = this.repo.delete(id);
    if (!deleted) {
      throw new AppError(`Partido with id ${id} not found`, 404, "RESOURCE_NOT_FOUND");
    }
    Logger.info(LogCategory.VOTING, "PARTIDO_DELETED", { metadata: { id } });
  }

  votePartido(id: string): void {
    const partido = this.repo.getById(id);
    if (!partido) {
      throw new AppError(`Partido with id ${id} not found`, 404, "RESOURCE_NOT_FOUND");
    }
    partido.numvotes++;
    this.repo.update(partido);
    Logger.info(LogCategory.VOTING, "VOTE_CAST", { 
      metadata: { id, currentVotes: partido.numvotes } 
    });
  }
}
