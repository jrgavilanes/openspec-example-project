## Context

The current application logic resides almost entirely within `src/index.ts`, creating a monolith that is hard to test and extend. The project's `config.yaml` dictates a layered architecture strategy. This change aims to refactor the 'partidos' functionality into a modular, layered structure (Domain, Repository, Service, Delivery) to improve maintainability and adherence to Clean Architecture principles.

## Goals / Non-Goals

**Goals:**
- Extract 'partidos' logic from `src/index.ts` into `src/features/partidos`.
- Implement a clear separation of concerns using Domain, Repository, Service, and Delivery layers.
- Ensure `src/index.ts` acts solely as an entry point for dependency injection and server startup.
- Maintain existing API behavior and contracts (no functional changes).

**Non-Goals:**
- Adding new features or API endpoints.
- Changing the database schema or underlying storage mechanism (currently likely in-memory or simple file-based, to be preserved).
- introducing a Dependency Injection framework (manual DI will be used).

## Decisions

### Directory Structure
We will adopt a feature-based folder structure:
`src/features/partidos/`
  - `domain/`: Entities (e.g., `Partido`), repository interfaces (`IPartidoRepository`).
  - `repository/`: Data access implementation (`PartidoRepository`).
  - `service/`: Business logic (`PartidoService`).
  - `delivery/`: HTTP handlers (`PartidoHandler` or `PartidoController`).

**Rationale**: Grouping by feature keeps related code together, while sub-folders enforce architectural layers.

### Manual Dependency Injection
Dependencies will be instantiated and injected in `src/index.ts`.
Example:
```typescript
const partidoRepo = new PartidoRepository(db);
const partidoService = new PartidoService(partidoRepo);
const partidoHandler = new PartidoHandler(partidoService);
```
**Rationale**: Keeps the application simple and avoids the overhead of reflection-based DI containers for this scale.

### Layer Responsibilities
- **Domain**: Pure TypeScript interfaces/classes. No external dependencies (e.g., no Bun specifics, no database drivers).
- **Repository**: Handles data persistence. Returns Domain entities.
- **Service**: Orchestrates business rules. Relies on Repository interfaces.
- **Delivery**: Handles HTTP requests/responses. Calls Service methods.

## Risks / Trade-offs

- **Risk**: Regression in API behavior during refactoring.
  - **Mitigation**: Ensure existing tests pass (if any) or manually verify endpoints with curl/Postman before and after changes.
- **Trade-off**: Increased boilerplate code (interfaces, separate files) compared to the single-file approach.
  - **Rationale**: The trade-off is acceptable for the gain in testability and maintainability.

## Migration Plan

1. Create directory structure.
2. Define Domain entities and interfaces.
3. Move data access logic to Repository.
4. Move business logic to Service.
5. Move route handling to Delivery.
6. Wire everything in `index.ts` and remove old code.
