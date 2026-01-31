# 🗳️ Bun Partidos WS

Sistema de votación en tiempo real diseñado con **Clean Architecture** y potenciado por **Bun**. Este proyecto implementa un servidor WebSocket nativo para la gestión y votación de partidos políticos sin dependencias externas innecesarias.

## 🛡️ Constitución del Proyecto (Tech Stack)

- **Runtime:** [Bun](https://bun.sh/) (Última versión).
- **Lenguaje:** TypeScript en modo estricto.
- **Servidor:** `Bun.serve` nativo con WebSockets.
- **Testing:** `bun:test` como corredor nativo.
- **Arquitectura:** Feature-Based Clean Architecture (Domain, Repository, Service, Delivery).

## 🏗️ Estructura de Carpetas

Nuestro código está organizado para la escalabilidad y mantenibilidad:

```text
src/
├── index.ts                 # Orquestador y punto de entrada
└── features/
    └── partidos/            # Dominio de votación
        ├── domain/          # Entidades e Interfaces puras
        ├── repository/      # Implementación de persistencia (In-memory)
        ├── service/         # Lógica de negocio y validaciones
        └── delivery/        # Manejador de protocolos WebSocket
```

## 📜 Comandos Útiles

### Instalación
*   **Instalar dependencias:**
    ```bash
    bun install
    ```
*   **Añadir tipos de uuid (si es necesario):**
    ```bash
    bun add -d @types/uuid
    ```

### Desarrollo y Ejecución
*   **Modo desarrollo (Hot reload):**
    ```bash
    bun run dev
    ```
*   **Ejecución normal:**
    ```bash
    bun run run
    ```

### Control de Calidad (Testing)
*   **Ejecutar todos los tests:**
    ```bash
    bun test
    ```
*   **Ejecutar tests con cobertura:**
    ```bash
    bun test --coverage
    ```

### Gestión con OpenSpec (OPSX)
Este proyecto utiliza el flujo experimental de OpenSpec para gestionar cambios:
*   **Explorar ideas:** `/opsx:explore`
*   **Nuevo cambio:** `/opsx:new` o `/opsx:ff`
*   **Implementar tareas:** `/opsx:apply`
*   **Verificar y archivar:** `/opsx:verify` y `/opsx:archive`
