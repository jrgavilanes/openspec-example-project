## MODIFIED Requirements

### Requirement: Votación de Partidos
El sistema DEBE permitir votar por un partido existente, incrementando su contador de votos en tiempo real.

#### Scenario: Votar por un partido
- **WHEN** el cliente envía un mensaje JSON `{ "action": "vote", "id": "<valid-uuid>" }`
- **THEN** el servidor incrementa en 1 el contador `numvotes` del partido correspondiente
- **AND** el servidor difunde la lista actualizada `{ "type": "update", "partidos": [...] }` a TODOS los clientes

#### Scenario: Error al votar (ID inválido)
- **WHEN** el cliente envía un mensaje JSON `{ "action": "vote", "id": "invalid-uuid" }`
- **THEN** el servidor responde al remitente con un error `VALIDATION_ERROR`

#### Scenario: Error al votar (Partido no encontrado)
- **WHEN** el cliente envía un mensaje JSON `{ "action": "vote", "id": "<non-existent-uuid>" }`
- **THEN** el servidor responde al remitente con un error `RESOURCE_NOT_FOUND`
