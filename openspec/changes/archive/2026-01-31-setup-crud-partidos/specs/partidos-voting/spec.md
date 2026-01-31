## ADDED Requirements

### Requirement: Votación de Partidos
El sistema DEBE permitir a los clientes emitir votos para un partido específico.

#### Scenario: Votar por un partido existente
- **WHEN** el cliente envía un mensaje JSON `{ "action": "vote", "id": "<valid-uuid>" }`
- **THEN** el servidor incrementa en 1 el campo `numvotes` del partido correspondiente
- **AND** el servidor difunde la lista actualizada `{ "type": "update", "partidos": [...] }` a TODOS los clientes conectados

#### Scenario: Votar por un partido inexistente
- **WHEN** el cliente envía un mensaje JSON `{ "action": "vote", "id": "<non-existent-uuid>" }`
- **THEN** el servidor ignora el mensaje o responde con un mensaje de error `{ "type": "error", "message": "Partido no encontrado" }` al cliente que envió la petición
- **AND** no se incrementa ningún contador ni se difunden actualizaciones de votos
