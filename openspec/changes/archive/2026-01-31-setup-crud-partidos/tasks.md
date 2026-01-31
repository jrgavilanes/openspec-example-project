## 1. Setup y Estructura Base

- [x] 1.1 Crear el archivo principal `index.ts` para el servidor Bun.
- [x] 1.2 Definir los tipos de datos (interfaces) para `Partido` y los mensajes del protocolo.
- [x] 1.3 Inicializar el almacén en memoria (`Map` o similar).

## 2. Implementación del Servidor WebSocket

- [x] 2.1 Configurar `Bun.serve` con soporte para WebSockets.
- [x] 2.2 Implementar el handler `open` para enviar el estado inicial a nuevos clientes.
- [x] 2.3 Implementar el despachador de mensajes en el handler `message`.

## 3. Lógica de CRUD (partidos-crud)

- [x] 3.1 Implementar la acción `create` para añadir nuevos partidos.
- [x] 3.2 Implementar la acción `delete` para eliminar partidos.
- [x] 3.3 Implementar la difusión (broadcast) automática a todos los clientes tras cada cambio.

## 4. Lógica de Votación (partidos-voting)

- [x] 4.1 Implementar la acción `vote` para incrementar votos de un partido por ID.
- [x] 4.2 Implementar validación para IDs inexistentes y envío de errores.
- [x] 4.3 Asegurar que los votos actualizados se difundan a todos los clientes.

## 5. Verificación y Pulido

- [x] 5.1 Realizar pruebas manuales de conexión y envío de mensajes JSON.
- [x] 5.2 Verificar que el estado se mantiene correctamente en memoria durante la sesión.
