## Context

The application currently uses raw `Bun.serve` WebSocket handlers. While functional, it lacks a consistent strategy for handling errors (e.g., malformed JSON, business logic violations) and logging system activity. This leads to silent failures or unhandled exceptions that could crash the server or leave sockets in inconsistent states.

## Goals / Non-Goals

**Goals:**
- Implement a structured logging system that outputs JSON lines for easy parsing.
- Define a standard error response format for all WebSocket interactions.
- Ensure all WebSocket handlers (open, message, close, drain) have exception safety.
- Decouple logging and error handling logic from business logic handlers.

**Non-Goals:**
- Implementing a full-blown monitoring stack (Prometheus, Grafana, etc.) - we just want logs.
- replacing `Bun.serve` with a framework like Express or Socket.io.

## Decisions

### 1. Structured Logger via `console` wrapper
We will create a lightweight `Logger` utility that wraps `console.log/error` but formats outputs as JSON.
*   **Rationale**: Keeps dependencies low (no Winston/Pino needed yet) while strictly adhering to the JSON-line requirement for future observability.
*   **Alternatives**: Using a library like `pino`. Rejected for now to keep the project dependency-free as per the "Clean Architecture" ethos for this scale, unless performance demands it later.

### 2. Centralized Error Handler Middleware/Wrapper
We will implement a Higher-Order Function (HOF) or a utility function `safeHandle(handler)` that wraps WebSocket message processing.
*   **Rationale**: Ensures every handler execution is wrapped in a `try/catch`. If an error bubbles up, this wrapper standardizes the error response to the client and logs the incident.
*   **Contract**: The wrapper catches `AppError` (known business errors) and generic `Error` (crashes).
*   **Format**: `{ "type": "ERROR", "payload": { "code": "...", "message": "..." } }`.

### 3. Socket Registry for Cleanup
We will maintain a `SocketRegistry` (Map<socketId, metadata>) to track active connections.
*   **Rationale**: `Bun.serve` manages the raw sockets, but we need to associate business metadata (like userId, active rooms) to efficiently clean up on `close`.
*   **Strategy**: On `close`, the registry is queried to find resources to release (e.g., remove user from active voting sessions).

## Risks / Trade-offs

- **Risk**: High volume logging might impact performance on `stdout`.
    - *Mitigation*: Ensure logs are asynchronous or buffered if possible, though `console.log` in Bun is generally fast. We will log only actionable events, not every heartbeat.
- **Risk**: wrapping every handler might obscure stack traces during development.
    - *Mitigation*: The `safeHandle` will log the full stack trace to stderr in development mode.

