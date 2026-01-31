## 1. Setup & Infrastructure

- [x] 1.1 Install `zod` dependency: `bun add zod`
- [x] 1.2 Create `src/core/errors/AppError.ts` defining the custom exception class
- [x] 1.3 Create `src/core/errors/ErrorHandler.ts` with the global formatting logic
- [x] 1.4 Update `src/index.ts` to wrap the WebSocket message handler with the global error catcher

## 2. Feature Refactor: Partidos Delivery

- [x] 2.1 Create `src/features/partidos/delivery/PartidoSchemas.ts` with Zod definitions for all actions (create, delete, vote)
- [x] 2.2 Refactor `src/features/partidos/delivery/PartidoHandler.ts` to use `PartidoSchemas.parse()` for all incoming messages
- [x] 2.3 Implement standardized error response in the handler for validation failures

## 3. Feature Refactor: Partidos Service

- [x] 3.1 Update `src/features/partidos/service/PartidoService.ts` to throw `AppError` (e.g., code `RESOURCE_NOT_FOUND`) when a partido doesn't exist
- [x] 3.2 Ensure service methods return clean data and let the handler/global-catcher manage the response format

## 4. Testing & Verification

- [x] 4.1 Update `src/features/partidos/repository/PartidoRepository.test.ts` if needed
- [x] 4.2 Update `src/features/partidos/service/PartidoService.test.ts` to assert that `AppError` is thrown with correct codes
- [x] 4.3 Manual verification: Send invalid WebSocket messages and verify the `VALIDATION_ERROR` response format
