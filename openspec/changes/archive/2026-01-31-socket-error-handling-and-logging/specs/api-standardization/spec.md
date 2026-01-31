## MODIFIED Requirements

### Requirement: Standard API Error Format
The system SHALL return a standardized error JSON structure for all failures, including validation errors, application logic errors, and unexpected server exceptions. For WebSocket communications, the message SHALL include a `type` field set to `ERROR`.

#### Scenario: Validation Error (Input Mismatch)
- **WHEN** a client sends a payload that does not match the expected Zod schema (e.g., missing field, wrong type)
- **THEN** the server SHALL respond with a JSON message:
  ```json
  {
    "type": "ERROR",
    "success": false,
    "error": {
      "code": "VALIDATION_ERROR",
      "message": "Validation failed",
      "details": [ ... ]
    }
  }
  ```
- **AND** the `details` field SHALL contain specific field errors provided by Zod.

#### Scenario: Resource Not Found Error
- **WHEN** an operation requests a resource that does not exist (e.g., delete non-existent ID)
- **THEN** the server SHALL respond with:
  ```json
  {
    "type": "ERROR",
    "success": false,
    "error": {
      "code": "RESOURCE_NOT_FOUND",
      "message": "The requested resource could not be found"
    }
  }
  ```

#### Scenario: Internal Server Error
- **WHEN** an unhandled exception occurs during processing
- **THEN** the server SHALL log the full error stack to the console (stderr) and as a structured `CRITICAL_ERROR` JSON log
- **AND** the server SHALL respond to the client with a generic error (hiding internal implementation details):
  ```json
  {
    "type": "ERROR",
    "success": false,
    "error": {
      "code": "INTERNAL_SERVER_ERROR",
      "message": "An unexpected error occurred"
    }
  }
  ```
