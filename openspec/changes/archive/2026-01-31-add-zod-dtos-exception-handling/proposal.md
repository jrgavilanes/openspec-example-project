## Why
Currently, the system lacks a consistent way to validate incoming WebSocket messages and handle errors. This leads to manual, repetitive validation logic in Handlers and unpredictable server behavior (or lack of feedback to the client) when invalid data is sent or internal errors occur.

## What Changes
- **Integración de Zod**: Se añade `zod` para validación de esquemas en tiempo de ejecución.
- **DTOs de Request/Response**: Definición de esquemas estrictos para todos los mensajes WebSocket en la capa de delivery.
- **Manejo Global de Excepciones**: Implementación de una clase `AppError` y un mecanismo centralizado en el servidor para capturar y normalizar errores.
- **Normalización de Respuestas**: Todas las respuestas de error seguirán el formato `{ "success": false, "error": { "code": string, "message": string, "details"?: any } }`.

## Capabilities

### New Capabilities
- `api-standardization`: Define el formato estándar de mensajes, validación y reporte de errores para todo el sistema.

### Modified Capabilities
- `partidos-crud`: Actualización de los escenarios para incluir validación estricta de entrada y respuestas de error normalizadas.
- `partidos-voting`: Actualización de los escenarios para incluir validación estricta de entrada y respuestas de error normalizadas.

## Impact
- **Dependencies**: Se agregará `zod` como dependencia de producción.
- **Capa de Delivery**: Los handlers (ej. `PartidoHandler.ts`) se refactorizarán para usar DTOs de Zod.
- **Infraestructura**: El entrypoint (`src/index.ts`) se actualizará para incluir el wrapper de manejo de errores global.
- **Capa de Servicio**: Se estandarizará el lanzamiento de excepciones usando `AppError`.
