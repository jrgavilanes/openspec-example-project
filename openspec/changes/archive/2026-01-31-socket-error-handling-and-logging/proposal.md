## Why

Currently, the system lacks robust error handling for WebSocket messages and a structured way to monitor system events. This makes it difficult to debug client issues or audit system activity (like votes or CRUD operations) in production.

## What Changes

- Implement a centralized error handling mechanism for WebSocket handlers.
- Standardize the error response payload sent to clients when invalid messages or system errors occur.
- Add structured JSON logging for critical system events (connections, disconnections, business logic events).
- Gracefully manage socket disconnections and resource cleanup.

## Capabilities

### New Capabilities
- `socket-lifecycle`: Management of open/close/drain events and associated cleanup.
- `system-observability`: Structured logging for auditing and debugging system behavior.

### Modified Capabilities
- `api-standardization`: Update error response requirements to include WebSocket-specific error codes and formats.

## Impact

- `src/index.ts`: Update `Bun.serve` websocket handlers.
- `src/features/partidos/delivery/`: Update handlers to use the new error handling and logging utilities.
- New core utilities for logging and error management.
