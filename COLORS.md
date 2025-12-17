# Color System Guide

All colors are centralized in `app/globals.css` using Tailwind CSS v4's CSS-first configuration. To change any color across the entire application, simply update the value in the CSS file.

## How to Change Colors

1. Open `app/globals.css`
2. Find the color you want to change in the `@theme` block
3. Update the hex value in the CSS custom property (e.g., `--color-background: #1a1a1a;`)
4. Save the file - changes will apply automatically

**Note:** Tailwind CSS v4 uses CSS-first configuration, so colors are defined using the `@theme` directive in CSS, not in `tailwind.config.ts`.

## Color Palette

### Background Colors

- `bg-background` - Main background color (#1a1a1a)
- `bg-background-dark` - Darker background variant (#0a0a0a)
- `bg-sidebar` - Sidebar background (#252525)
- `bg-card` - Card/container background (#252525)

### Interactive States

- `bg-hover` - Hover state background (#2a2a2a)
- `bg-active` - Active/selected state background (#333)

### Borders

- `border-border` - Default border color (#333)

### Text Colors

- `text-foreground` or `text-text-primary` - Primary text (#ffffff)
- `text-text-secondary` - Secondary text (#9ca3af / gray-400)
- `text-text-muted` - Muted/placeholder text (#6b7280 / gray-500)
- `text-text-tertiary` - Tertiary text (#d1d5db / gray-300)

### Accent Colors

- `accent-purple` - Purple accent (#9333ea)
- `accent-orange` - Orange accent (#ea580c)
- `accent-yellow` - Yellow accent (#eab308)
- `accent-red` - Red accent (#dc2626)

## Usage Examples

### Background

```tsx
<div className="bg-background">Main background</div>
<div className="bg-sidebar">Sidebar background</div>
<div className="bg-card">Card background</div>
```

### Text

```tsx
<span className="text-foreground">Primary text</span>
<span className="text-text-secondary">Secondary text</span>
<span className="text-text-muted">Muted text</span>
```

### Interactive States

```tsx
<button className="bg-hover hover:bg-active">Hover me</button>
```

### Borders

```tsx
<div className="border border-border">Bordered element</div>
```

### Gradients

```tsx
<div className="bg-gradient-to-br from-accent-purple to-accent-orange">
  Gradient background
</div>
<div className="bg-gradient-to-r from-accent-yellow to-accent-orange">
  Horizontal gradient
</div>
```

## Custom Animations & Styles

### Generating Animation

The prompt input box has a special animation when music is being generated:

```tsx
<div className="prompt-input-container generating">
  {/* Animated orange gradient border sweeps during generation */}
</div>
```

Features:

- Animated gradient border with orange glow
- Smooth sweeping animation (2s duration)
- Blur effect for outer glow
- Automatically triggered by `.generating` class

### Border Flow Animation

A flowing border animation for highlighting active elements:

```tsx
<div className="border-flow">
  {/* Animated white border flows around the element */}
</div>
```

Features:

- Continuous flowing white gradient border
- 3s animation loop
- Subtle, elegant effect for special UI elements

### Custom Scrollbars

#### Textarea Scrollbar

All textareas have custom styled scrollbars:

- Width: 8px
- Transparent background
- Semi-transparent white thumb
- Hover effect for better visibility

#### Profile Menu Scrollbar

The profile menu uses a thinner custom scrollbar (`.custom-scrollbar` class):

```tsx
<div className="custom-scrollbar">
  {/* Content with custom thin scrollbar */}
</div>
```

Features:

- Width: 6px
- Even more subtle appearance
- Smooth hover transitions

## Tooltip Styling

The app uses Tippy.js for tooltips with custom styling imported from `tippy.js/dist/tippy.css`. Tooltips automatically match the dark theme.

## Quick Color Reference

| Use Case           | Tailwind Class        | Current Value |
| ------------------ | --------------------- | ------------- |
| Main background    | `bg-background`       | #1a1a1a       |
| Dark background    | `bg-background-dark`  | #0a0a0a       |
| Sidebar background | `bg-sidebar`          | #252525       |
| Card background    | `bg-card`             | #252525       |
| Hover state        | `bg-hover`            | #2a2a2a       |
| Active state       | `bg-active`           | #333          |
| Border             | `border-border`       | #ffffff30     |
| Primary text       | `text-foreground`     | #ffffff       |
| Secondary text     | `text-text-secondary` | #9ca3af       |
| Muted text         | `text-text-muted`     | #6b7280       |
| Tertiary text      | `text-text-tertiary`  | #d1d5db       |
| Purple accent      | `accent-purple`       | #9333ea       |
| Orange accent      | `accent-orange`       | #ea580c       |
| Yellow accent      | `accent-yellow`       | #eab308       |
| Red accent         | `accent-red`          | #dc2626       |

## Customizing Animations

All custom animations are defined in `app/globals.css`. To modify them:

### Generating Animation Speed

```css
.prompt-input-container.generating::before {
  animation: sweep 2s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate;
  /* Change 2s to adjust speed */
}
```

### Border Flow Speed

```css
.border-flow::before {
  animation: borderFlow 3s linear infinite;
  /* Change 3s to adjust speed */
}
```

### Generating Animation Colors

The generating animation uses orange gradient colors. To change:

```css
.prompt-input-container::before {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(234, 88, 12, 0.15) 40%,
    /* Adjust these rgba values */ rgba(234, 88, 12, 0.6) 46%,
    rgba(251, 146, 60, 1) 50%,
    /* ... */
  );
}
```

## CSS Variables Reference

All colors are available as CSS variables:

```css
var(--color-background)       /* #1a1a1a */
var(--color-background-dark)  /* #0a0a0a */
var(--color-foreground)       /* #ffffff */
var(--color-sidebar)          /* #252525 */
var(--color-card)             /* #252525 */
var(--color-hover)            /* #2a2a2a */
var(--color-active)           /* #333 */
var(--color-border)           /* #ffffff30 */
var(--color-text-primary)     /* #ffffff */
var(--color-text-secondary)   /* #9ca3af */
var(--color-text-muted)       /* #6b7280 */
var(--color-text-tertiary)    /* #d1d5db */
var(--color-accent-purple)    /* #9333ea */
var(--color-accent-orange)    /* #ea580c */
var(--color-accent-yellow)    /* #eab308 */
var(--color-accent-red)       /* #dc2626 */
```

Use these variables in custom CSS:

```css
.my-custom-element {
  background: var(--color-background);
  color: var(--color-foreground);
  border: 1px solid var(--color-border);
}
```
