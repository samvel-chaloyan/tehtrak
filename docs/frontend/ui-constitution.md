# Tehtrak UI Constitution v1

## Purpose

This document defines the visual and interaction rules for every Tehtrak screen.

All new screens, components, and flows must follow these rules.

Do not invent styles outside this system without updating this document.

---

# Layout

## Screen Padding

Default:

24

Never less than:

16

---

## Vertical Rhythm

Allowed spacing values:

4
8
12
16
24
32
48

Do not use arbitrary spacing.

---

# Typography

## Screen Title

Size: 28

Weight: 600

Examples:

* Workspaces
* Collections
* Winter Food

---

## Section Title

Size: 18

Weight: 600

---

## Body

Size: 16

Weight: 400

---

## Caption

Size: 14

Weight: 400

Color: secondary text

---

# Colors

Primary:
#29B5E8

Text Primary:
#0F172A

Text Secondary:
#475569

Background:
#FFFFFF

Surface:
#F8FAFC

Border:
#E2E8F0

Success:
#16A34A

Warning:
#D97706

Error:
#DC2626

---

# Cards

Cards are notebook pages.

Rules:

* white background
* subtle border
* radius 16
* padding 16

Prefer borders over shadows.

Heavy shadows are prohibited.

---

# Buttons

## Primary

Background:
Primary Blue

Text:
White

Height:
48

Radius:
12

Used for:

* create
* save
* continue

Only one primary button should exist per screen.

---

## Secondary

White background

Blue border

Blue text

---

## Ghost

No background

Blue text

Used for lightweight actions.

---

## Danger

White background

Red border

Red text

Used for destructive actions only.

---

# Forms

## Input Fields

Height:
48

Radius:
12

Border:
1px

Background:
White

---

## Labels

Always above the field.

Never use floating labels.

---

## Validation

Errors appear:

* below field
* red text
* concise wording

Example:

"Name is required"

Not:

"Validation failed"

---

# Lists

Workspace lists

Collection lists

Item lists

All use card-based layouts.

Spacing between cards:

12

Entire card is tappable.

---

# Empty States

Required structure:

1. Three Tehtrak lines
2. Title
3. Short description
4. Primary action

Example:

---

---

---

No items yet

Start recording your first item.

[ Add Item ]

---

# Loading States

Prefer skeleton placeholders.

Avoid full-screen spinners.

Full-screen loaders are allowed only during:

* app startup
* authentication bootstrap

---

# Navigation

Top Bar:

* Back button
* Title
* Optional action

Never overload the header.

Maximum:

One primary action.

---

# Icons

Use simple outline icons.

Avoid:

* 3D icons
* colorful icons
* decorative iconography

Icons support content.

Icons are not content.

---

# Animations

Duration:

150ms–250ms

Allowed:

* fade
* scale
* slide

Avoid:

* bounce
* exaggerated spring motion
* playful effects

Tehtrak should feel calm.

---

# Accessibility

Minimum touch target:

44x44

Maintain accessible color contrast.

Do not communicate information using color alone.

---

# Screen Quality Checklist

Before shipping any screen, verify:

[ ] Purpose is immediately clear
[ ] One primary action exists
[ ] Uses approved spacing values
[ ] Uses approved colors
[ ] Uses approved typography
[ ] Empty state exists
[ ] Loading state exists
[ ] Error state exists
[ ] Supports accessibility basics
[ ] Feels consistent with existing screens

If any item fails, the screen is not complete.
