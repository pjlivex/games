# Design Brief

## Direction

Playful Pop Game Portal — vibrant, colorful game discovery platform inspired by Poki with high-energy, youth-oriented aesthetic combining modern confidence with approachable warmth.

## Tone

Bold maximalism with rounded, friendly shapes. Vibrant magenta and teal accents dominate; playful yet polished, never childish. Strong typographic hierarchy through size and weight.

## Differentiation

Signature smooth animations (hover lift on cards, staggered entrance animations) combined with gradient-accented game tiles and energetic color palette create an unforgettable portal experience.

## Color Palette

| Token          | OKLCH           | Role                           |
| -------------- | --------------- | ------------------------------ |
| background     | 0.98 0.005 280  | Warm, spacious light surface   |
| foreground     | 0.18 0.02 280   | Deep charcoal for text         |
| card           | 1.0 0.0 0       | Pure white elevation           |
| primary        | 0.55 0.24 305   | Vibrant magenta (buttons)      |
| accent         | 0.7 0.18 195    | Teal complement (highlights)   |
| secondary      | 0.94 0.02 280   | Soft muted for secondary       |
| destructive    | 0.55 0.22 25    | Warm red for danger            |

## Typography

- Display: Space Grotesk — modern, confident, energetic headings and hero text
- Body: Plus Jakarta Sans — friendly, approachable, rounded warmth for UI and content
- Mono: Geist Mono — technical elements, code, badges
- Scale: hero `text-6xl md:text-7xl font-bold`, h2 `text-4xl font-bold`, label `text-xs font-semibold uppercase`, body `text-base`

## Elevation & Depth

Layered card system with graduated shadows: subtle (2px/4px) for content cards, elevated (8px/12px) for interactive elements and hover states. No harsh shadows; all shadows use soft RGBA with 6–12% opacity.

## Structural Zones

| Zone      | Background       | Border                 | Notes                                         |
| --------- | ---------------- | ---------------------- | --------------------------------------------- |
| Header    | warm gradient bg | subtle bottom border   | AdSense slot below, category nav optional     |
| Content   | bg-background    | —                      | Alternate card backgrounds (white/secondary) |
| Sidebar   | card/secondary   | subtle right border    | Category filters, AdSense slot                |
| Footer    | secondary/muted  | subtle top border      | AdSense slot, links, social icons             |

## Spacing & Rhythm

Spacious rhythm (gaps 6–8 sections, cards 16px padding). Game tiles in responsive grid (2–4 columns mobile-to-desktop). Micro-spacing (4–8px) for button/input internals. Section dividers via subtle borders or background shifts, never hard lines.

## Component Patterns

- Buttons: rounded-lg, vibrant primary/accent, smooth hover scale+shadow lift
- Game Cards: white card background, gradient accent top border or overlay, rounded-lg, hover scale-up with shadow elevation
- Badges: rounded-full, primary/accent colors, uppercase label
- Inputs: rounded-md, border-border focus:ring-primary, light grey placeholder

## Motion

- Entrance: staggered slide-up (0.5s) on game cards, fade-in on page load
- Hover: smooth 0.3s lift (translate Y-4px) with shadow elevation on interactive elements
- Decorative: soft pulse animation on featured/trending badges
- Page transitions: fade-in 0.4s, no abrupt pops

## Constraints

- No full-page gradients; keep backgrounds clean to preserve readability
- All gradients constrained to accent elements (gradient-primary, gradient-warm utility classes)
- AdSense slots require minimum 300px width; position in header (320px), sidebar (300px), footer (728px)
- Never use opacity-based text; always use semantic color tokens for AA+ contrast

## Signature Detail

Gradient-accented game card top border (magenta→teal) combined with smooth hover lift animation creates visual delight and memorable portal navigation experience.
