## ADDED Requirements

### Requirement: Structured JSON Logging
The system SHALL provide a centralized Logger utility that outputs events as JSON strings to `stdout`.

#### Scenario: Log a system event
- **WHEN** a significant system event occurs (e.g., `SOCKET_CONNECTED`)
- **THEN** the system SHALL output a JSON line containing `timestamp`, `level`, `category`, `event`, and `socketId`

### Requirement: Exception Safety for Message Handlers
The system SHALL wrap all WebSocket message handlers in an error-handling wrapper to prevent unhandled exceptions from crashing the server.

#### Scenario: Malformed JSON received
- **WHEN** a message that is not valid JSON is received
- **THEN** the system SHALL log a `WARN` event and notify the client with a standard error payload
