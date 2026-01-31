## MODIFIED Requirements

### Requirement: Gestionar Partidos Políticos
El sistema DEBE permitir la creación y listado de partidos políticos.
Un partido político tiene los campos: `id` (UUIDv4), `name` (string) y `numvotes` (number, inicializado en 0).

#### Scenario: Crear partido nuevo
- **WHEN** el cliente envía un mensaje JSON `{ "action": "create", "name": "Partido A" }`
- **THEN** el servidor valida que `name` sea un string no vacío
- **AND** el servidor crea el partido con un ID único y 0 votos
- **AND** el servidor responde con el evento `{ "type": "update", "partidos": [...] }` incluyendo el nuevo partido a TODOS los clientes conectados

#### Scenario: Error al crear partido (Nombre inválido)
- **WHEN** el cliente envía un mensaje JSON `{ "action": "create", "name": "" }` (vacío) o falta el campo `name`
- **THEN** el servidor responde al remitente con un error `VALIDATION_ERROR` detallando el fallo

#### Scenario: Listar partidos al conectar
- **WHEN** un cliente se conecta al WebSocket
- **THEN** el servidor envía inmediatamente el estado actual con `{ "type": "update", "partidos": [...] }`

#### Scenario: Borrar partido
- **WHEN** el cliente envía un mensaje JSON `{ "action": "delete", "id": "<valid-uuid>" }`
- **THEN** el servidor elimina el partido de la memoria
- **AND** el servidor difunde la lista actualizada a TODOS los clientes

#### Scenario: Error al borrar partido (ID inválido)
- **WHEN** el cliente envía un mensaje JSON `{ "action": "delete", "id": "invalid-uuid" }`
- **THEN** el servidor responde al remitente con un error `VALIDATION_ERROR` indicando formato de UUID incorrecto

#### Scenario: Error al borrar partido (No encontrado)
- **WHEN** el cliente envía un mensaje JSON `{ "action": "delete", "id": "<non-existent-uuid>" }`
- **THEN** el servidor responde al remitente con un error `RESOURCE_NOT_FOUND`
