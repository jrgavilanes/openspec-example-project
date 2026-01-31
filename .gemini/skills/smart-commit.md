# Skill: Smart Commit Generator

## Description
Genera mensajes de commit semánticos basados en el trabajo actual de OpenSpec.

## Instructions
Actúa como un experto en **Conventional Commits** y sigue estrictamente las reglas definidas en `openspec/config.yaml`.

1. **Analiza el contexto:**
   - Identifica el cambio activo en OpenSpec (nombre del change).
   - Lee las tareas marcadas como completadas (`[x]`) en la conversación reciente o en el archivo `tasks.md`.

2. **Genera el mensaje:**
   - **Header:** `type(scope): short summary` (imperativo, minúsculas).
   - **Body:** Lista con guiones de los cambios técnicos principales.
   - **Footer:** `Implements: <nombre-del-cambio-openspec>`

3. **Output:**
   - Entrega SOLO el bloque de código con el mensaje, listo para copiar y pegar.

## Trigger Examples
- "Genera el commit"
- "Dame el mensaje de commit"
- "Commit changes"