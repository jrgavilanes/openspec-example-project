## Context

Actualmente no existe un servidor configurado en el proyecto. Se requiere crear una implementación simple y nativa utilizando Bun para explorar sus capacidades de WebSocket y rendimiento. El objetivo es didáctico y exploratorio para "AI Engineering" y Bun.

## Goals / Non-Goals

**Goals:**
- Implementar un servidor HTTP/WebSocket utilizando `Bun.serve`.
- Gestionar un estado en memoria para los partidos políticos (CRUD).
- Permitir la conexión de clientes vía WebSocket para recibir actualizaciones en tiempo real y enviar votos.
- Definir un protocolo JSON simple para la comunicación cliente-servidor.

**Non-Goals:**
- Persistencia de datos (base de datos).
- Autenticación o autorización de usuarios.
- Frontend (el alcance se limita al servidor/backend).
- Tests de carga exhaustivos en esta fase inicial.

## Decisions

### 1. Servidor Nativo Bun
- **Decisión:** Utilizar `Bun.serve` en lugar de frameworks como Express o Fastify.
- **Razón:** Aprovechar el rendimiento nativo de Bun y su API simplificada para WebSockets. Minimizar dependencias externas.

### 2. Almacenamiento en Memoria
- **Decisión:** Utilizar una estructura en memoria (ej. `Map<string, Partido>`) dentro del proceso del servidor.
- **Razón:** Simplicidad para el prototipo. Evita la complejidad de configurar una DB externa.
- **Alternativas:** SQLite (soportado nativamente por Bun), pero descartado para mantener el alcance mínimo inicial.

### 3. Protocolo JSON
- **Decisión:** Los mensajes WebSocket serán objetos JSON con una propiedad `type` o `action` para despachar la lógica.
- **Razón:** Facilidad de depuración y parseo estándar.

### 4. Gestión de Estado y Concurrencia
- **Decisión:** El estado será global (singleton) en el módulo del servidor.
- **Razón:** Al ser un solo proceso de Bun, no hay necesidad de sincronización entre procesos/hilos por ahora.

## Risks / Trade-offs

- **Risk:** Pérdida de datos al reiniciar el servidor.
  - **Mitigation:** Aceptable para un entorno de pruebas/aprendizaje. Documentar claramente que el estado es efímero.
- **Risk:** Escalabilidad limitada a una sola instancia.
  - **Mitigation:** No es un objetivo actual. Se podría migrar a Redis/PubSub en el futuro si fuera necesario escalar.
