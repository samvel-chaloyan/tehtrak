# Agent Instructions (Cursor)

You are implementing **Tehtrak** — a mobile-first configurable operational memory system designed to feel like a calm operational notebook for real-world information.

The documentation inside this repository is the source of truth.

Do not invent architecture, domain rules, UI patterns, or workflows that contradict the documentation.

---

# Before Writing Code

## Product & Domain

Read:

* docs/README.md
* docs/product/vision.md
* docs/architecture/domain-model.md

Understand:

* What Tehtrak is
* Who it is for
* Core hierarchy
* Domain terminology

---

## Backend

Read:

* docs/backend/api-contract.md
* docs/backend/api-conventions.md
* docs/backend/database-schema.md

Follow documented API contracts and data structures.

---

## Frontend

### UI Philosophy

Read:

* docs/frontend/design-language.md
* docs/frontend/ui-constitution.md

These documents define:

* brand identity
* product personality
* visual principles
* interaction principles

---

### UI Implementation

Read:

* docs/frontend/ui-system.md
* docs/frontend/form-engine.md
* docs/frontend/navigation.md
* docs/frontend/state-management.md

These documents define:

* tokens
* components
* navigation patterns
* form rendering architecture

---

# Non-Negotiable Rules

## Data Model

Use:

Metadata tables + JSONB record storage

Never create:

* collection-specific SQL tables
* dynamic database schemas
* per-collection entities

Records store values inside JSONB.

---

## Product Language

User-facing copy must use:

* Workspace
* Collection
* Item
* Property

Avoid technical terminology such as:

* Schema
* Entity
* Resource
* Dataset

---

## Architecture

Do not introduce new architectural patterns without updating documentation.

Prefer extending existing patterns over introducing abstractions.

---

## Security

All mutating operations must be authorized server-side.

Never trust client permissions.

---

## Mobile First

Design for phones first.

Requirements:

* large touch targets
* reachable actions
* simple navigation
* offline-aware architecture

---

## No Hardcoded Business Logic

Tehtrak is configurable.

Do not create:

* parking-specific features
* inventory-specific features
* warehouse-specific screens

Build generic systems.

---

# Implementation Order

Follow:

docs/implementation/phase-1.md

Strict order:

Auth
→ Workspace
→ Collection
→ Field
→ Record
→ Offline
→ Search
→ Attachment

Do not skip ahead.

Do not implement later milestones before earlier milestones are complete.

---

# UI Rules

Before creating or modifying any screen:

1. Read docs/frontend/design-language.md
2. Read docs/frontend/ui-constitution.md
3. Read docs/frontend/ui-system.md

All UI must comply with these documents.

Do not invent:

* colors
* spacing values
* typography scales
* component variants
* interaction patterns
* navigation patterns

outside the established design system.

---

## Screen Creation Rules

When creating a new screen:

1. Follow the Design Language.
2. Follow the UI Constitution.
3. Reuse existing components first.
4. Prefer composition over one-off implementations.
5. Keep screens focused and uncluttered.
6. Respect mobile-first layouts.

Every screen must provide:

* loading state
* empty state
* error state

where applicable.

---

# Development Philosophy

Build incrementally.

Each milestone should:

* compile successfully
* run successfully
* be testable independently

Avoid speculative engineering.

Avoid premature optimization.

Avoid building future phases early.

---

# Stack Reference

| Area         | Technology                           |
| ------------ | ------------------------------------ |
| Mobile       | React Native, Expo, TypeScript       |
| State        | Zustand, TanStack Query              |
| Forms        | React Hook Form, Zod                 |
| API          | Axios                                |
| Auth Storage | SecureStore                          |
| Backend      | ASP.NET Core                         |
| Architecture | Clean Architecture, Modular Monolith |
| Database     | PostgreSQL                           |
| Offline      | SQLite (offline phase only)          |

---

# Coding Standards

Read:

docs/engineering/coding-standards.md

Follow:

* SOLID principles
* strong typing
* clear naming
* feature-based organization
* reusable components
* maintainable code

---

# When Unsure

Do not invent architecture.

Do not guess domain behavior.

Either:

* follow existing documentation
* propose a documentation update
* ask for clarification

Documentation is the contract.

Code must follow the contract.
