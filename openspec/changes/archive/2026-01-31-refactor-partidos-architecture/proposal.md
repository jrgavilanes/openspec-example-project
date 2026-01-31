## Why

The current implementation of the 'partidos' logic is tightly coupled within `index.ts`, violating the separation of concerns and making the codebase difficult to maintain and scale. This refactoring is needed to align the project with the defined Architecture Strategy in `config.yaml`, ensuring a clean, layered architecture that facilitates testing and future development.

## What Changes

- **Refactor `partidos` feature**: Isolate all 'partidos' related logic into its own feature directory structure (`src/features/partidos`).
- **Implement Layered Architecture**:
    - **Domain**: Define entities and repository interfaces.
    - **Repository**: Implement data access logic.
    - **Service**: Implement business logic.
    - **Delivery**: Implement HTTP handlers.
- **Clean `index.ts`**: Reduce `index.ts` to a pure orchestrator role, responsible only for wiring up dependencies and starting the server.
- **Dependency Injection**: Manually inject dependencies between layers as per the project's convention.

## Capabilities

### New Capabilities
<!-- Capabilities being introduced. Replace <name> with kebab-case identifier (e.g., user-auth, data-export, api-rate-limiting). Each creates specs/<name>/spec.md -->
- `partidos-architecture`: Defines the structural layout and component interaction for the partidos feature, adhering to the clean architecture principles.

### Modified Capabilities
<!-- Existing capabilities whose REQUIREMENTS are changing (not just implementation).
     Only list here if spec-level behavior changes. Each needs a delta spec file.
     Use existing spec names from openspec/specs/. Leave empty if no requirement changes. -->

## Impact

- **`src/index.ts`**: Will be significantly reduced in size and complexity.
- **New Directory Structure**: `src/features/partidos/` will be created with subdirectories for `domain`, `repository`, `service`, and `delivery`.
- **Existing Logic**: Current 'partidos' logic will be moved and refactored; however, external API behavior should remain unchanged (this is a refactor, not a functional change).
