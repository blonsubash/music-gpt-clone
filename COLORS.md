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

## Quick Color Reference

| Use Case           | Tailwind Class        | Current Value |
| ------------------ | --------------------- | ------------- |
| Main background    | `bg-background`       | #1a1a1a       |
| Sidebar background | `bg-sidebar`          | #252525       |
| Card background    | `bg-card`             | #252525       |
| Hover state        | `bg-hover`            | #2a2a2a       |
| Active state       | `bg-active`           | #333          |
| Border             | `border-border`       | #333          |
| Primary text       | `text-foreground`     | #ffffff       |
| Secondary text     | `text-text-secondary` | #9ca3af       |
| Purple accent      | `accent-purple`       | #9333ea       |
| Orange accent      | `accent-orange`       | #ea580c       |
| Yellow accent      | `accent-yellow`       | #eab308       |
