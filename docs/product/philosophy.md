# Product Philosophy

## What the app should feel like

> A smart notebook for real-world things.

## What it must NOT feel like

- ERP
- Database software
- Enterprise management software

## UX qualities (required)

| Quality | Meaning |
|---------|---------|
| Human | Plain language, forgiving flows |
| Practical | Solves real tasks, not feature demos |
| Visual | Scannable lists, clear hierarchy |
| Approachable | Low cognitive load |
| Mobile-native | Designed for phone, not adapted desktop |

## Platform principles

### 1. Configurable, not hardcoded

Support dynamic collections, fields, forms, permissions, and views.

Avoid hardcoded modules and industry-specific logic.

### 2. Mobile first

Assumptions: one-hand usage, offline usage, quick data entry, camera-first interactions.

This is mobile-native operational software — not desktop software shrunk to a phone.

### 3. Offline first

Users operate underground, in villages, warehouses, and poor connectivity zones. The app must remain fully functional offline for core workflows.

### 4. Human language

| Avoid | Use |
|-------|-----|
| schema | collection structure |
| entity | item |
| table | collection |
| relation | link |
| field (user-facing) | property |

Internal code may use `Field`, `Record`, etc. User-facing copy uses **property**, **item**, **collection**, **workspace**.

## Design inspiration

Linear, Notion, Stripe — clean, modern, calm, whitespace-focused, typography-driven.
