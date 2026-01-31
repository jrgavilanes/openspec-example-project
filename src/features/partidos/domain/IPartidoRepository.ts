import { Partido } from "./Partido";

export interface IPartidoRepository {
  getAll(): Partido[];
  getById(id: string): Partido | undefined;
  create(name: string): Partido;
  delete(id: string): boolean;
  update(partido: Partido): void;
}
