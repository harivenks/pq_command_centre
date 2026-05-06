You’re right — that layer was missing.
And it’s actually important because this defines **how everything should feel**, not just what to build.

Let’s fix that properly and integrate it into your **HAVI Command Centre Figma prompt**.

---

# 🧠 UPDATED FIGMA PROMPT — WITH DESIGN STYLE CONTEXT

---

## 🟢 1. INSTRUCTION

Design a **clickable Command Centre screen** for **PacQuant Compass** that simulates a real product experience with interactive widgets and query-based intelligence.

Create both **Light and Dark theme variants** using the same layout and component system.

---

## 🎯 2. DESIGN STYLE (CRITICAL — DO NOT SKIP)

### Internal Name:

> **Neutral Data UI (Institutional Style)**

---

### Core Principles:

* **Data-first**
  UI exists to surface insights, not decorate the interface

* **Low decoration**
  No gradients, no shadows, no visual noise

* **Semantic colors only**
  Colors communicate meaning (risk, opportunity, status)

* **Strong typography hierarchy**
  Numbers and key metrics dominate visually over labels

---

### Visual Behavior:

* Feels like a **tool**, not a marketing product
* Dense but structured
* Calm, precise, analytical
* Similar to financial terminals (not SaaS landing pages)

---

### Golden Rule:

> If you remove all colors and view in grayscale — the UI should still work.

---

## 🔵 3. CONTEXT

This is a **demo prototype**, not production UI.

Goal:

> Make the client feel like they can explore and query real intelligence

NOT:

* A static dashboard
* A presentation slide

---

## ⚠️ 4. DESIGN CONSTRAINTS

* ❌ No gradients

* ❌ No drop shadows

* ❌ No decorative UI

* ❌ No redesigning layout

* ✅ Use existing design system

* ✅ Prioritize clarity over aesthetics

* ✅ Interaction > visual polish

---

## 🧱 5. FRAME SETUP

* 1440px desktop frame
* Auto layout (vertical stacking)

Frames:

* `Command Centre — Light`
* `Command Centre — Dark`

---

## 🎨 6. COLOR SYSTEM (DUAL THEME)

---

### 🌙 DARK

* Background: near-black
* Cards: dark gray
* Borders: low contrast
* Text: off-white

---

### 🌞 LIGHT

* Background: soft gray
* Cards: white
* Borders: light gray
* Text: dark gray

---

### 🎯 SHARED SEMANTIC COLORS

* Teal → Primary / active / focus
* Red → Risk / critical
* Amber → Warning
* Blue → Regulatory / info
* Green → Positive / live

👉 Colors should **highlight meaning only**, not decorate.

---

## 🔤 7. TYPOGRAPHY RULES (VERY IMPORTANT)

* Data values = **largest + boldest**
* Labels = small + muted
* Section titles = medium emphasis

---

### Hierarchy Example:

* KPI → 22–28px bold
* Section title → 14–16px
* Label → 11–12px

---

👉 If everything looks equal → hierarchy is broken

---

## 🧭 8. TOP NAVIGATION

* PacQuant Compass (left)
* Tabs (exact order)
* Live data indicator (right)

States:

* Active → teal underline
* Spec Intelligence → teal text

---

## 📰 9. NEWS FEED

* Thin horizontal strip
* Low emphasis
* Informational, not dominant

---

## 🚨 10. ALERT CARDS

* 3 cards (Red / Amber / Blue)
* Use **left border color indicator**, not full color fill

---

## 🧩 11. CORE WIDGETS (MAIN FOCUS)

Layout:

* Left: full
* Center: full
* Right: stacked

---

### ⚠️ IMPORTANT:

> These are NOT “cards”
> These are **decision surfaces**

---

## ⭐ DEFAULT STATE

* Cost widget pre-selected

---

## 🟦 12. WIDGET DESIGN RULES

* Flat surfaces
* Subtle borders
* No elevation tricks

---

### Selected State:

* Teal border
* Slight background tint

### Unselected:

* Slightly muted

---

## 💬 13. QUERY INPUT (CORE EXPERIENCE)

* Fixed at bottom
* Always visible

---

### Behavior:

* Widget selection → gives context
* Input → triggers response
* Response → structured insight

---

## 🤖 14. RESPONSE PANEL

Structure:

1. Short explanation
2. Data-backed points
3. Follow-up questions

---

👉 Must feel:

* Intelligent
* Structured
* Trustworthy

---

## ⚙️ 15. INTERACTION MODEL

* Hover = subtle feedback
* Click = clear state change
* Transition = fast (150–200ms)

---

👉 No fancy animation
👉 No motion for decoration

---

## 🧩 16. COMPONENT SYSTEM

Create reusable components:

* Nav bar
* Alert cards
* Widget cards
* Query input
* Response panel

Variants:

* Light / Dark
* Default / Selected

---

## 🧠 17. EXPERIENCE PRINCIPLE (MOST IMPORTANT)

This screen is not about:

❌ Showing data

It is about:

✅ Letting the user **ask questions and get answers**

---

## 🔥 FINAL CHECK

Before finishing, validate:

* Can user understand screen in < 5 seconds?
* Is Cost widget clearly dominant?
* Is query input obvious without explanation?
* Does interaction feel real (not fake demo)?

---

# ⚡ Short version (if needed)

> Design a dual-theme Command Centre for PacQuant Compass using a Neutral Data UI (Institutional Style). The UI should be data-first, minimal, and driven by typography hierarchy. Avoid gradients and shadows. Focus on 4 interactive widgets and a query-response system that makes the interface feel like an intelligent tool rather than a dashboard.

---

If you want to go one level deeper (this will really level up your work):

👉 I can define **exact spacing, grid, and component tokens (Figma variables)**
👉 Or rewrite **each widget to sound 10x more “intelligent” in the demo**

---

And tell me:

**Should I add fixture tools so reviewers can stress-test this?**
