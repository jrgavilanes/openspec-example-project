## Context
Currently, the application relies on manual input validation within WebSocket handlers and Service methods. This approach is error-prone, repetitive, and lacks strong type safety for incoming data. Additionally, error handling is inconsistent; some errors might crash the server or return unhelpful messages to the client. We want to professionalize the API surface by introducing strict schema validation and a standardized error reporting mechanism.

## Goals / Non-Goals

**Goals:**
- **Strict Validation:** Validate all incoming WebSocket payloads against Zod schemas before processing.
- **Type Safety:** Generate TypeScript types directly from Zod schemas for DTOs.
- **Unified Error Handling:** Catch all synchronous and asynchronous errors in a central place and format them consistently.
- **Operational Errors:** Distinguish between programming errors (bugs) and operational errors (invalid input, not found) using an `AppError` class.

**Non-Goals:**
- **Database Migration:** This change focuses on the API layer; persistence remains in-memory for now.
- **Authentication:** Auth is out of scope for this specific change.

## Decisions

### 1. Zod for Schema Definition
**Decision:** We will use `zod` as the single source of truth for validation rules and DTO types.
**Rationale:** Zod offers excellent TypeScript inference, a fluent API, and runtime validation. It allows us to define the shape of the data once and get both the runtime validator and the static type.
**Alternatives:** `joi` (lesser TS inference), `class-validator` (requires decorators/classes, more verbose).

### 2. DTOs in Delivery Layer
**Decision:** Input validation schemas (DTOs) will reside in the `delivery` layer (e.g., `src/features/partidos/delivery/schemas.ts`).
**Rationale:** Validation is a concern of the delivery mechanism (parsing raw input). The Domain layer should receive already-validated, clean data.
**Pattern:**
```typescript
// delivery/schemas.ts
export const CreatePartidoSchema = z.object({
  action: z.literal('create'),
  name: z.string().min(1).max(50)
});
export type CreatePartidoRequest = z.infer<typeof CreatePartidoSchema>;
```

### 3. Global Exception Handler & `AppError`
**Decision:** Implement a custom `AppError` class and a central error handling utility.
**Rationale:** We need to differentiate between expected errors (user did something wrong) and unexpected errors (system crashed).
**Implementation:**
- `AppError` will hold `statusCode`, `errorCode` (string), and `message`.
- A `safeHandler` wrapper or a `try/catch` block at the root of the WebSocket `message` handler will catch errors.
- If `instanceof AppError` -> return formatted JSON with specific code.
- If `instanceof ZodError` -> return 400 with validation details.
- Else -> log error and return generic 500 "Internal Server Error".

### 4. Standard Error Response Format
**Decision:** All errors will follow this JSON structure:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR", // or NOT_FOUND, INTERNAL_ERROR
    "message": "Invalid input data",
    "details": [...] // Optional, for validation issues
  }
}
```

## Risks / Trade-offs

- **Risk:** Refactoring existing handlers might break current functionality if schemas are too strict initially.
    - **Mitigation:** Write tests for the new schemas and ensure existing integration tests pass.
- **Risk:** Runtime overhead of Zod validation.
    - **Trade-off:** Negligible compared to the safety benefits in a Node/Bun environment.

## Migration Plan

1.  Add `zod` dependency.
2.  Create `AppError` and the global error handler utility.
3.  Refactor `partidos` feature:
    -   Define Schemas/DTOs.
    -   Update `PartidoHandler` to use `Schema.parse()`.
    -   Update `PartidoService` to throw `AppError` instead of generic errors.
4.  Verify with tests.
