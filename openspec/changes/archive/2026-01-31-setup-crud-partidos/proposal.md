## Why

Para aprender AI Engineering y probar Bun con WebSockets mediante la implementación de un sistema de votación simple y reactivo.

## What Changes

- Creación de un servidor WebSocket nativo con Bun.
- Implementación de un CRUD de partidos políticos almacenados en memoria.
- Soporte para votación en tiempo real a través de mensajes JSON.

## Capabilities

### New Capabilities
- `partidos-crud`: Manejo de la entidad Partido (id, name, numvotes) y operaciones básicas (crear, leer, borrar).
- `partidos-voting`: Protocolo WebSocket para emitir votos y recibir actualizaciones de los resultados.

### Modified Capabilities
- Ninguna.

## Impact

- Nuevo servidor WebSocket en el puerto predeterminado.
- Dependencia de `uuid` para la generación de identificadores únicos.
- Estado en memoria (no persistente por ahora).
