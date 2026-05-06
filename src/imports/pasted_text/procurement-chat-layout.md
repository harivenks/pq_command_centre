CONTEXT
The Procurement screen currently has a bottom chat panel. Relocate it to a right-side expanding
panel. The panel has no close/collapse state — it opens when Summarize is clicked and remains
permanently open for the rest of the demo. The dashboard (map, charts, filter bar) stays on the
left and shrinks to accommodate the panel.

───────────────────────────────────────────────
LAYOUT CHANGE
───────────────────────────────────────────────
Before: Full-width dashboard + chat panel stacked below.
After:
- Left column: dashboard (map + charts + filter bar), width shrinks to ~65% of screen.
- Right column: chat panel, fixed width ~35%, full height, no close button, no collapse.
- The right panel slides in from the right with a smooth transition when Summarize is clicked.
- Once open, it cannot be closed. Remove any close/X button entirely.

───────────────────────────────────────────────
SUMMARIZE BUTTON
───────────────────────────────────────────────
- Button remains in the Procurement Intelligence header.
- On click: right panel slides open. Button label changes to "Chat active" (disabled state).
- The button does NOT disappear. It stays in its current position, disabled.

───────────────────────────────────────────────
RIGHT PANEL — PERSISTENT HEADER
───────────────────────────────────────────────
- Left: teal sparkle icon + label "Procurement AI — Insight Assistant"
- Do not include muted text "Structured analysis · not financial advice", remove if present
- No close button. No collapse control. Ever.

───────────────────────────────────────────────
MESSAGE 1 — TRIGGERED BY SUMMARIZE BUTTON
───────────────────────────────────────────────
USER BUBBLE (right-aligned, teal background):
"Summarize the average cost of paper cup procured for Brand A in 2025 for all
regions and map against volumes supplied"

Loading animation: 3 bouncing teal dots. Then AI response appears:

AI RESPONSE BLOCK:

Summary text:
"The average unit price across regions are:
1. EMEA: $0.69
2. LATAM: $0.82
While no units were found for APAC, North America units show an average unit
price of $0.77."

GRAPH — Dual-axis chart:
Title: "Avg. Unit Price of Paper Cup – 2025"
X-axis: EMEA | APAC | LATAM | NA
Left Y-axis (Volumes): 0 to 50000, interval 5000
Right Y-axis (Avg Unit Price): 0.0 to 0.9, interval 0.1
Bars (blue, volumes):
  EMEA: 46000
  APAC: 0
  LATAM: 20000
  NA: 34000
Line (orange, avg unit price):
  EMEA: 0.69
  APAC: 0
  LATAM: 0.82
  NA: 0.77
Show value labels on bars and line points.
Horizontal grid lines only.
Legend below chart: "Volumes" (blue bar) | "Avg. Unit Price $" (orange line)

DATA TABLE:
Columns: Region | Volumes | Avg. Unit Price (in $)
EMEA   | 46000  | 0.69
APAC   | 0      | 0
LATAM  | 20000  | 0.82
NA     | 34000  | 0.77
Header row styled with muted/dark background. Alternating row tones.

SUGGESTED QUESTIONS label: "SUGGESTED QUESTIONS" (9px, bold, muted, all caps)
Chips (teal border, teal text, 20px border-radius):
1. For NA region, share details of suppliers and their prices for paper cups of 120ml
2. Show break-up of the average unit price by supplier for EMEA
3. Prepare a report of the average unit price findings across regions

───────────────────────────────────────────────
MESSAGE 2 — USER CLICKS CHIP 1
───────────────────────────────────────────────
Chips disappear. USER BUBBLE (right-aligned, teal background):
"For NA region, share details of suppliers and their prices for paper cups of 120ml"

Loading animation: 3 bouncing teal dots. Then AI response appends below:

AI RESPONSE BLOCK:

Summary text:
"The supplier prices for unassigned regions range between $0.76 and $0.78.
The price for Supplier A is the highest in average unit price but the volumes
produced are the lowest at 6000. Would you like to analyze further?"

GRAPH — Grouped bar chart:
Title: "Supplier Prices for Paper Cup at NA – 2025"
X-axis: Supplier A | Supplier B | Supplier D
Groups per supplier (4 bars each, distinct colors):
  Avg. Unit Price | Material Cost | Conversion Cost | Logistics Cost
  Supplier A: 0.8  | 0.15 | 0.55 | 0.1
  Supplier B: 0.76 | 0.17 | 0.5  | 0.09
  Supplier D: 0.77 | 0.15 | 0.53 | 0.09
Show value labels on bars. Horizontal grid lines only.
Legend below chart for all 4 metrics.

DATA TABLE:
Columns: Supplier Name | Avg. Unit Price (in $) | Volumes | Material Cost (in $) |
         Conversion Cost (in $) | Logistics Cost (in $)
Supplier A | 0.8  | 6000  | 0.15 | 0.55 | 0.1
Supplier B | 0.76 | 16000 | 0.17 | 0.5  | 0.09
Supplier D | 0.77 | 12000 | 0.15 | 0.53 | 0.09
Header row styled with muted/dark background. Alternating row tones.

SUGGESTED QUESTIONS label: "SUGGESTED QUESTIONS" (9px, bold, muted, all caps)
Chips (teal border, teal text, 20px border-radius):
1. Compare current supplier prices with should-cost as per the market benchmark
2. View all materials being sourced from Supplier A
3. Break down the suppliers by region and illustrate

───────────────────────────────────────────────
MESSAGE 3 — USER CLICKS CHIP 1
───────────────────────────────────────────────
Chips disappear. USER BUBBLE (right-aligned, teal background):
"Compare current supplier prices with should-cost as per the market benchmark"

Loading animation: 3 bouncing teal dots. Then AI response appends below:

AI RESPONSE BLOCK:

Summary text:
"The supplier prices for unassigned regions range between $0.76 and $0.78.
The price for Supplier A is the highest in average unit price but the volumes
produced are the lowest at 6000. Would you like to analyze further?"

GRAPH — Stacked bar chart:
Title: "Current Price vs Market Should Cost"
X-axis: Supplier A | Supplier B | Supplier C | Market
Stacks per bar (3 segments, distinct colors): Material | Conversion | Logistics
  Supplier A (Current price): 0.15 | 0.55 | 0.1  → Total: 0.8
  Supplier B (Current price): 0.17 | 0.5  | 0.09 → Total: 0.76
  Supplier C (Current price): 0.15 | 0.53 | 0.09 → Total: 0.77
  Market     (Should cost):   0.15 | 0.48 | 0.09 → Total: 0.72
Show total value labels above each bar. Horizontal grid lines only.
Legend below chart: Material cost | Conversion cost | Logistics cost

DATA TABLE:
Columns: Source | Benchmark | Material Cost (in $) | Conversion Cost (in $) |
         Logistics Cost (in $) | Total (in $)
Supplier A | Current price | 0.15 | 0.55 | 0.1  | 0.8
Supplier B | Current price | 0.17 | 0.5  | 0.09 | 0.76
Supplier C | Current price | 0.15 | 0.53 | 0.09 | 0.77
Market     | Should cost   | 0.15 | 0.48 | 0.09 | 0.72
Header row styled with muted/dark background. Alternating row tones.

NO SUGGESTED QUESTIONS. Do not render a chips section after this response.

End of conversation marker: display a thin, grey line after the answer is provided. No text.
"— End of guided analysis —"

───────────────────────────────────────────────
INTERACTION RULES
───────────────────────────────────────────────
- Each response APPENDS below previous content. No reset. No screen clear.
- Scroll position moves to the latest message after each response renders.
- Chips from the previous step are removed the moment one is clicked.
- The panel never closes. No X button. No collapse. No toggle.
- Loading dots (3 bouncing teal circles) play between every user message and
  AI response.
- All content is pre-written and static. No live AI calls.

───────────────────────────────────────────────
VISUAL STYLE
───────────────────────────────────────────────

- User bubbles: right-aligned, teal tinted background, border-radius 10px 10px 2px 10px.
- AI response blocks: left-aligned, surfaceHover background, 1px border,
  border-radius 2px 10px 10px 10px.
- Tables: muted header row, 1px border between rows, tabular-nums font.
- Charts: blue bars + orange line (Message 1); grouped colored bars (Message 2);
  stacked colored bars (Message 3).
- Chip buttons: teal border, teal text, teal tinted background, 20px border-radius,
  arrow icon on the right.
- "SUGGESTED QUESTIONS" label: 9px, bold, muted, letter-spacing 0.5px, all caps.
- Section labels on AI blocks: 10px, bold, teal, letter-spacing 0.5px, all caps.