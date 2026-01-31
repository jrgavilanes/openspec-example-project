## 1. Setup Structure

- [x] 1.1 Create feature directory structure `src/features/partidos/` with subdirectories `domain`, `repository`, `service`, and `delivery`.

## 2. Domain Layer

- [x] 2.1 Define `Partido` entity interface in `src/features/partidos/domain/Partido.ts`.
- [x] 2.2 Define `IPartidoRepository` interface in `src/features/partidos/domain/IPartidoRepository.ts`.

## 3. Repository Layer

- [x] 3.1 Implement `PartidoRepository` in `src/features/partidos/repository/PartidoRepository.ts`, moving data access logic from `index.ts`.
- [x] 3.2 Create unit tests for Repository in `src/features/partidos/repository/PartidoRepository.test.ts`.

## 4. Service Layer

- [x] 4.1 Implement `PartidoService` in `src/features/partidos/service/PartidoService.ts`, moving business logic from `index.ts`.
- [x] 4.2 Create unit tests for Service in `src/features/partidos/service/PartidoService.test.ts`.

## 5. Delivery Layer

- [x] 5.1 Implement `PartidoHandler` (or Controller) in `src/features/partidos/delivery/PartidoHandler.ts`, moving HTTP handling logic from `index.ts`.

## 6. Orchestration & Cleanup

- [x] 6.1 Update `src/index.ts` to instantiate Repository, Service, and Handler classes and inject dependencies.
- [x] 6.2 Update `src/index.ts` to use the new Handler for routes.
- [x] 6.3 Remove old 'partidos' logic from `src/index.ts`.
- [x] 6.4 Verify application builds and runs correctly.
- [x] 6.5 Run all tests to ensure regressions are not introduced.