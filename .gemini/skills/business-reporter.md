# Skill: Business Reporter

## Description
Genera un informe ejecutivo para stakeholders (negocio/management) basado en las especificaciones técnicas actuales del proyecto.

## Context Sources
Debes leer y sintetizar la información de:
1. `openspec/specs/` (Lee todas las subcarpetas para entender qué funcionalidades existen).
2. `openspec/config.yaml` (Para la visión global del dominio).
3. `package.json` (Para ver la versión actual del producto).

## Instructions
Actúa como un **Product Manager**. Tu objetivo es traducir especificaciones técnicas a valor de negocio.

### Reglas de Traducción:
- **NO** hables de: Endpoints, JSON, WebSockets, Clases, Interfaces, Repositorios.
- **SÍ** habla de: Funcionalidades de usuario, Capacidades del sistema, Fiabilidad, Seguridad.
- *Ejemplo:* En vez de "CRUD de Partidos con UUID", di "Gestión completa del catálogo de Partidos Políticos".
- *Ejemplo:* En vez de "Socket Lifecycle & Heartbeat", di "Conexión en tiempo real robusta y auto-recuperable".

### Estructura del Informe:
1. **Resumen Ejecutivo:** Visión general del estado del producto.
2. **Capacidades Funcionales (Features):** Lista de lo que el usuario puede hacer.
3. **Cualidades del Sistema (No-funcionales):** Velocidad, Observabilidad, Estabilidad (basado en specs como `system-observability`).
4. **Estado Actual:** Basado en lo que veas implementado o especificado.

## Trigger Examples
- "@business-reporter"
- "Genera un informe para los stakeholders"
- "Resumen de negocio del proyecto"