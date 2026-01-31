## ADDED Requirements

### Requirement: Gestionar Partidos Políticos
El sistema DEBE permitir la creación y listado de partidos políticos.
Un partido político tiene los campos: `id` (UUIDv4), `name` (string) y `numvotes` (number, inicializado en 0).

#### Scenario: Crear partido nuevo
- **WHEN** el cliente envía un mensaje JSON `{ "action": "create", "name": "Partido A" }`
- **THEN** el servidor crea el partido con un ID único y 0 votos
- **AND** el servidor responde con el evento `{ "type": "update", "partidos": [...] }` incluyendo el nuevo partido a TODOS los clientes conectados

#### Scenario: Listar partidos al conectar
- **WHEN** un cliente se conecta al WebSocket
- **THEN** el servidor envía inmediatamente el estado actual con `{ "type": "update", "partidos": [...] }`

#### Scenario: Borrar partido
- **WHEN** el cliente envía un mensaje JSON `{ "action": "delete", "id": "<valid-uuid>" }`
- **THEN** el servidor elimina el partido de la memoria
- **AND** el servidor difunde la lista actualizada a TODOS los clientes
