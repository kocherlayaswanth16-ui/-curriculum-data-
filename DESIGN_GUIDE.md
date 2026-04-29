# UI/UX Design Guide - Curriculum Analytics Engine

## 🎨 Design Philosophy

This application follows a **modern dark-theme with glass morphism** design pattern, optimized for:
- Extended viewing (dark reduces eye strain)
- Data visualization clarity
- Professional appearance
- Accessibility and readability

---

## 🎯 Design System

### Color Palette

#### Primary Colors
- **Sky Blue (#38bdf8)**: Primary CTAs, highlights, active states
- **Slate 900-950**: Dark backgrounds and cards
- **Slate 100-300**: Text hierarchy

#### Semantic Colors
- **Emerald Green (#22c55e)**: Success, positive metrics
- **Amber Yellow (#f59e0b)**: Warnings, medium priority
- **Rose Red (#ef4444)**: Alerts, high priority/danger
- **Purple (#8b5cf6)**: Faculty role indicator
- **Blue (#3b82f6)**: Student role indicator

### Typography
- **Font Family**: Inter (system fallback: -apple-system, Segoe UI)
- **Headings**: Bold, tracking-tight
- **Body**: Regular 14-16px
- **Captions**: 12-14px, semi-bold

### Spacing & Layout
- **Base Unit**: 4px (Tailwind default)
- **Gap Standard**: 6px, 16px, 24px
- **Padding**: 16px-32px for cards
- **Border Radius**: 12px-32px (smooth, modern look)

---

## 🧩 Component Library

### Buttons

#### `.btn-primary` - Primary CTA
```css
Background: Gradient (sky-500 to sky-600)
Hover: Scale 1.05, enhanced shadow
Used for: Main actions (Sign in, Analyze, Upload)
```

#### `.btn-secondary` - Secondary CTA
```css
Border: Slate 700
Text: Slate 200
Hover: Border → sky-500, text → sky-300
Used for: Secondary actions (Edit, View, Cancel)
```

#### `.btn-outline` - Alternative CTA
```css
Border: Emerald 500/50
Text: Emerald 300
Hover: BG emerald-500/10, border → emerald-400
Used for: Copy, Download, Alternative actions
```

### Cards

#### `.card` - Base Card Style
```
Border: 1px solid slate-800
Background: rgba(15, 23, 42, 0.6)
Padding: 24px
Radius: 16px
Shadow: Slate 950/30
Hover: Border → slate-700, shadow → sky-500/10
```

#### `.card-elevated` - Hover Lift Effect
```
All `.card` properties
Hover: -translate-y-2 (lifts up 8px)
Used for: Feature showcases
```

#### `.card-interactive` - Clickable Cards
```
All `.card` properties
Cursor: pointer
Hover: border → sky-500/50
Used for: Action cards
```

### Glass Morphism

#### `.glass` - Primary Glass Effect
```css
Background: rgba(15, 23, 42, 0.8)
Backdrop: blur(10px)
Border: 1px solid rgba(100, 116, 139, 0.2)
```

#### `.glass-secondary` - Purple Tinted Glass
```css
Background: rgba(30, 27, 75, 0.6)
Backdrop: blur(8px)
Border: 1px solid rgba(126, 34, 206, 0.2)
```

### Badges

#### `.badge-success` - Green Badge
```css
Background: rgba(34, 197, 94, 0.15)
Text: emerald-300
Padding: 4px 12px
Radius: 9999px (fully rounded)
```

#### `.badge-warning` - Amber Badge
```css
Background: rgba(245, 158, 11, 0.15)
Text: amber-300
```

#### `.badge-danger` - Red Badge
```css
Background: rgba(239, 68, 68, 0.15)
Text: rose-300
```

#### `.badge-info` - Blue Badge
```css
Background: rgba(56, 189, 248, 0.15)
Text: sky-300
```

### Progress Bars

#### `.progress-bar` & `.progress-fill`
```css
Container Height: 8px
Fill: Gradient (sky-500 to sky-600)
Radius: 9999px
Animation: Smooth transition on value change
```

### Input Fields

#### `.input-field`
```
Border: slate-700
Background: rgba(15, 23, 42, 0.5)
Focus: border → sky-500, shadow-glow, bg → slate-950
Radius: 12px
```

### Role Badges

#### Role-Specific Visual Indicators
```
Student: Blue background + icon 👨‍🎓
Faculty: Purple background + icon 👨‍🏫
HOD: Amber background + icon 👨‍💼
Admin: Rose background + icon ⚙️
```

---

## 📱 Layout Patterns

### Header Layout
```
[Logo] --- [Navigation Links] --- [User Profile + Logout]
```
- Sticky positioning
- Glass background
- Shadow on scroll

### Dashboard Layout
```
[Section Title]
[Stats Grid - 4 cols]
[Charts Grid - 2 cols lg, 1 col md]
[Data Tables / Cards]
```

### Form Layout
```
[Card Container]
  [Title]
  [Input Fields - Vertical Stack]
  [Button Group - Horizontal]
```

### Table Layout
```
[Bordered table in card]
[Hover row highlight]
[Action buttons on right]
[Responsive scroll on mobile]
```

---

## 🎬 Animations & Interactions

### Fade In
```css
animation: fadeIn 0.3s ease-out
```
Used for: Page loads, modals

### Slide Up
```css
animation: slideInUp 0.5s ease-out
```
Used for: Hero sections, forms

### Hover Effects
```
Cards: -translate-y-1 to -translate-y-2
Buttons: scale-105, shadow enhancement
```

### Transitions
```css
transition: all 0.3s ease-out
```
Applied to: All interactive elements

---

## 🎯 Page-Specific Design

### Home Page
- **Hero**: Large gradient text + CTA buttons
- **Features Grid**: 4-column card layout
- **KPI Box**: Glassmorphic card with nested stats

### Student Dashboard
- **Header**: Welcome message + overall score
- **Stats**: 4-column grid
- **Charts**: 2-column layout (bar + line)
- **Subjects**: Topic-item list with progress
- **Recommendations**: Card list with priority badges

### Faculty Dashboard
- **Stats**: 4-column grid
- **Charts**: 2-column layout
- **Subject Cards**: Expandable, actionable
- **Quick Actions**: 3-column grid of action cards

### HOD Dashboard
- **Stats**: 4-column grid
- **Charts**: Comparison + trend analysis
- **Department Table**: Sortable table
- **Recommendations**: Priority-colored cards

### Admin Dashboard
- **Stats**: 4-column grid
- **Charts**: Line + pie
- **Users Table**: Full CRUD table
- **Settings**: Checkbox grid + action buttons

---

## ♿ Accessibility Features

### Color Contrast
- All text meets WCAG AA standards
- Semantic color usage (not just color-dependent)

### Focus States
- All inputs have visible focus indicators
- Focus ring: 2px sky-500

### Responsive Text
- Min 16px on mobile for inputs
- Adequate line-height (1.5+)
- Readable font sizes

### Semantic HTML
- Proper heading hierarchy (h1, h2, h3)
- Form labels associated with inputs
- Button type attributes

---

## 📱 Responsive Breakpoints

### Mobile (< 640px)
- Single column layouts
- Full-width cards
- Collapsed navigation
- Smaller font sizes

### Tablet (640px - 1024px)
- 2-column grids
- Compact sidebar
- Adjusted chart heights

### Desktop (> 1024px)
- 3-4 column grids
- Full sidebar
- Optimal chart dimensions

---

## 🎨 CSS Customization

### Using Tailwind Classes
```jsx
// Primary button
<button className="btn-primary">Click me</button>

// Card with hover effect
<div className="card card-elevated">
  Content
</div>

// Badge with success color
<span className="badge badge-success">Success</span>

// Input field
<input className="input-field" />
```

### Custom CSS Variables
```css
:root {
  --gradient-primary: linear-gradient(135deg, #38bdf8, #0284c7);
  --gradient-secondary: linear-gradient(135deg, #22c55e, #16a34a);
}
```

---

## 🚀 Performance Optimizations

### CSS-Based Animations
- Hardware-accelerated transforms
- Smooth 60fps animations
- No JavaScript overhead

### Responsive Images
- Tailwind sizing classes
- Dynamic chart resizing

### Grid System
- CSS Grid for layout
- Flexbox for components
- No unnecessary DOM nesting

---

## 🎓 Design Best Practices Applied

1. **Consistency**: Same component = same styling
2. **Hierarchy**: Visual weight matches importance
3. **Feedback**: All interactions have visual response
4. **Efficiency**: Minimal clicks to complete tasks
5. **Clarity**: Data visualization is immediately understandable
6. **Accessibility**: Inclusive design for all users

---

## 📋 Quick Reference

### Common Component Patterns

#### Metric Card
```jsx
<div className="card">
  <p className="text-sm text-slate-400">Label</p>
  <p className="text-4xl font-bold text-sky-400">Value</p>
</div>
```

#### Data Row
```jsx
<div className="topic-item">
  <p className="font-semibold text-white">Title</p>
  <span className="badge-success">Status</span>
</div>
```

#### Action Container
```jsx
<div className="card">
  <h3 className="text-2xl font-semibold text-white">Section</h3>
  <button className="btn-primary mt-4">Action</button>
</div>
```

---

**Design System Version**: 1.0  
**Last Updated**: April 2026  
**Built with**: Tailwind CSS + React
