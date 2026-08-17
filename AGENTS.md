# Agent Instructions (Cursor)

IMPORTANT:

Tehtrak is not a CRUD application.

Tehtrak is a mobile-first operational notebook.

Workspace → Collection → Item should feel like:

Notebook → Section → Page

not:

Database → Table → Record

When uncertain, choose the solution that feels more like a trusted notebook and less like management software.

The product should feel:

* calm
* trustworthy
* warm
* organized
* professional
* human

The product should not feel:

* enterprise
* dashboard-like
* inventory software
* database software
* developer tooling
* admin software

---

You are implementing **Tehtrak** — a mobile-first configurable operational memory system designed to feel like a calm operational notebook for real-world information.

The documentation inside this repository is the source of truth.

Implementation must follow documentation.

If code and documentation conflict, documentation wins.

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

### Visual Identity System

Read:

* docs/frontend/design-tokens.md
* docs/frontend/typography.md
* docs/frontend/components.md
* docs/frontend/screen-patterns.md
* docs/frontend/ui-audit.md

These documents define:

* design tokens
* spacing rules
* typography hierarchy
* component contracts
* screen layouts
* visual identity

These documents are mandatory.

Do not introduce new:

* colors
* spacing values
* typography scales
* radii
* component variants
* card styles
* button styles

unless the documentation is updated first.

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
* Metadata
* Resource
* Dataset
* Configuration

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

**Current core slice (shipped):**

Auth
→ Workspace
→ Collection
→ Field
→ Record (Item)

**Deferred enhancements** (offline, server search, attachments, invites, activity feed, Sentry, elderly text) are documented but **not** expected next work unless the product owner prioritizes them. Do not treat them as unfinished MVP.

Do not invent later-phase features as mandatory before the core notebook is solid.

---

# UI Rules

Before creating or modifying any UI:

Read:

1. docs/frontend/design-language.md
2. docs/frontend/ui-constitution.md
3. docs/frontend/design-tokens.md
4. docs/frontend/typography.md
5. docs/frontend/components.md
6. docs/frontend/screen-patterns.md
7. docs/frontend/ui-audit.md

All UI must comply with these documents.

---

## Tehtrak Identity

Tehtrak is a calm operational notebook.

UI should feel:

* warm
* trustworthy
* calm
* organized
* professional
* human

UI should not feel:

* enterprise
* dashboard-like
* admin software
* inventory software
* developer tooling
* database management

---

## Visual Hierarchy

Typography creates hierarchy.

Do not use:

* bright colors
* heavy borders
* large buttons
* visual effects

to compensate for poor hierarchy.

---

## Content First

Content is always the hero.

Actions support content.

Lists should visually dominate screens.

Buttons should never dominate screens.

---

## Accent Color

Primary color should be used sparingly.

Use primarily for:

* active state
* focused state
* primary action

Avoid decorative use.

If a screen feels visually dominated by the primary color, reduce usage.

---

## Design Tokens

Use documented design tokens only.

Never introduce:

* arbitrary spacing
* arbitrary font sizes
* arbitrary radii
* arbitrary animation durations

outside documented tokens.

---

## Components

Reuse existing components whenever possible.

Prefer extending existing components over creating new visual patterns.

Do not create one-off UI styles.

---

# Screen Quality Gate

Before marking any UI work complete, read:

* docs/frontend/ui-audit.md

UI work is not complete after implementation.

UI work is complete only after:

1. Implementation
2. Audit
3. Audit report

---

## Mandatory Audit

Every new screen, screen modification, redesign, refactor, or feature addition must pass the UI Audit.

A screen is not considered complete simply because it functions.

It must satisfy:

* Design Language
* UI Constitution
* Design Tokens
* Typography Rules
* Component Rules
* Screen Patterns
* UI Audit

---

## Required Report

When delivering UI work always provide:

### UI Audit Results

PASS

* list passed items

FAIL

* list failed items

RECOMMENDATIONS

* future improvements

Do not claim UI work is complete without providing the audit.

---

# Screen Creation Rules

When creating a new screen:

1. Follow the Design Language.
2. Follow the UI Constitution.
3. Follow Design Tokens.
4. Follow Typography Rules.
5. Follow Component Rules.
6. Follow Screen Patterns.
7. Reuse existing components first.
8. Prefer composition over one-off implementations.
9. Keep screens focused and uncluttered.
10. Respect mobile-first layouts.

Every screen must provide:

* loading state
* empty state
* error state

where applicable.

---

# Definition of Done

A feature is complete only when:

* Documentation requirements are satisfied
* TypeScript passes
* Build passes
* Loading state exists
* Empty state exists
* Error state exists
* UI follows Design Language
* UI follows UI Constitution
* Design Tokens respected
* Typography Rules respected
* Component Rules respected
* Screen Patterns respected
* UI Audit completed
* UI Audit report provided
* Screen passes Screen Quality Checklist

Working functionality alone is not considered complete.

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

| Area | Technology |
|--------|------------|
| Mobile | React Native, Expo, TypeScript |
| State | Zustand, TanStack Query |
| Forms | React Hook Form, Zod |
| API | Axios |
| Auth Storage | SecureStore |
| Backend | ASP.NET Core |
| Architecture | Clean Architecture, Modular Monolith |
| Database | PostgreSQL |
| Offline | SQLite (offline phase only) |

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

Do not invent UI patterns.

Do not invent visual styles.

Either:

* follow existing documentation
* propose a documentation update
* ask for clarification

Documentation is the contract.

Code must follow the contract.