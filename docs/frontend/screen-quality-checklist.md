# Screen Quality Checklist

## Purpose

This document defines the minimum quality standard for every screen in Tehtrak.

A screen is considered complete only when it passes all applicable checks.

The goal is consistency, maintainability, accessibility, and a recognizable Tehtrak experience.

This checklist applies to:

* New screens
* Existing screens being modified
* Refactors
* Feature additions

---

# Core Principle

Every screen should feel like it belongs to the same product.

Users should never experience:

* inconsistent layouts
* inconsistent spacing
* inconsistent interactions
* inconsistent language
* inconsistent visual hierarchy

When in doubt:

Prefer consistency over creativity.

---

# Design Language Compliance

## Identity

* [ ] Screen feels calm and operational
* [ ] Screen feels like a notebook, not enterprise software
* [ ] Screen follows the Design Language
* [ ] Screen follows the UI Constitution

---

## Branding

* [ ] Uses ThreeLines where appropriate
* [ ] Uses Tehtrak terminology
* [ ] Avoids technical or developer language

Allowed:

* Workspace
* Collection
* Item
* Property

Avoid:

* Schema
* Entity
* Metadata
* Resource
* Dataset
* Configuration

---

# Layout

## Structure

* [ ] Uses Screen component
* [ ] Uses ScreenHeader when appropriate
* [ ] Uses PageTitle when appropriate
* [ ] Uses spacing tokens only
* [ ] No magic spacing values

---

## Spacing

* [ ] Screen padding follows theme tokens
* [ ] Section spacing follows theme tokens
* [ ] List spacing follows theme tokens
* [ ] Card spacing follows theme tokens

---

# Typography

* [ ] Uses typography tokens only
* [ ] No arbitrary font sizes
* [ ] Clear visual hierarchy
* [ ] Titles use PageTitle or theme title styles
* [ ] Section headers use sectionTitle styles

---

# Colors

* [ ] Uses theme colors only
* [ ] No hardcoded color values
* [ ] Uses primary blue intentionally
* [ ] Maintains sufficient contrast

Primary color:

#29B5E8

---

# Components

## Reuse

* [ ] Reuses existing UI primitives
* [ ] Does not duplicate shared components
* [ ] Uses Button component
* [ ] Uses Card component
* [ ] Uses Input component

Prefer composition over one-off implementations.

---

## Actions

* [ ] Has one clear primary action
* [ ] Secondary actions are visually secondary
* [ ] Destructive actions use danger styling

---

# States

Every screen must handle all applicable states.

## Loading

* [ ] Loading state exists
* [ ] Uses Skeleton components when possible
* [ ] Avoids unnecessary full-screen spinners

---

## Empty

* [ ] Empty state exists
* [ ] Uses EmptyNotebook
* [ ] Empty state contains clear action

---

## Error

* [ ] Error state exists
* [ ] Error message is human-readable
* [ ] Retry action exists when appropriate

---

# Forms

Applicable to form screens.

* [ ] Uses React Hook Form
* [ ] Uses Zod validation
* [ ] Validation messages are human-readable
* [ ] Required fields are clearly indicated
* [ ] Submit button has loading state

---

# Navigation

* [ ] Navigation follows navigation.md
* [ ] Back behavior is predictable
* [ ] No dead-end screens
* [ ] Deep links remain possible

---

# Accessibility

* [ ] Touch targets are comfortable
* [ ] Interactive elements are clearly visible
* [ ] Color is not the only indicator
* [ ] Text remains readable on smaller devices

---

# Mobile First

* [ ] Works on smaller phones
* [ ] Keyboard does not hide critical actions
* [ ] Primary actions are easy to reach
* [ ] Lists scroll smoothly

---

# Performance

* [ ] No unnecessary re-renders
* [ ] Lists use FlashList when appropriate
* [ ] Expensive calculations are memoized
* [ ] No obvious UI jank

---

# Technical Quality

* [ ] TypeScript passes
* [ ] Lint passes
* [ ] No unused code
* [ ] No debug logs
* [ ] No TODO comments left behind

---

# Final Question

Before marking a screen complete:

Would a user believe this screen belongs to Tehtrak?

If the answer is not an immediate "yes", continue refining.
