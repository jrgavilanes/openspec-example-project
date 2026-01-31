## 1. Core Utilities

- [x] 1.1 Implement `Logger` utility for structured JSON logging in `src/core/utils/Logger.ts`
- [x] 1.2 Implement `SocketRegistry` to track active connections and metadata in `src/core/socket/SocketRegistry.ts`
- [x] 1.3 Update `ErrorHandler` to support WebSocket error formats (`type: "ERROR"`)

## 2. Infrastructure & Middleware

- [x] 2.1 Implement `safeHandle` HOF to wrap WebSocket message handlers with error catching and logging
- [x] 2.2 Update `src/index.ts` to implement `open`, `close`, and `drain` handlers
- [x] 2.3 Integrate `SocketRegistry` into `open` and `close` handlers in `src/index.ts`

## 3. Feature Integration

- [x] 3.1 Update `PartidoHandler` to use the `safeHandle` wrapper for message processing
- [x] 3.2 Add logging for key events in `PartidoService` (e.g., voting, creation)
- [x] 3.3 Ensure resource cleanup in `PartidoService` is triggered via `SocketRegistry` on disconnect

## 4. Verification

- [x] 4.1 Add unit tests for `Logger` and `SocketRegistry`
- [x] 4.2 Add integration tests for `safeHandle` ensuring standard error payloads
- [x] 4.3 Verify JSON log output format matches requirements
