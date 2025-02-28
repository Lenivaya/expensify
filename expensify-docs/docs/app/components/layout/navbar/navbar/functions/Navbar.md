# Function: Navbar()

> **Navbar**(): `Element`

The main navigation component for the application

## Returns

`Element`

## Description

This component provides the main navigation interface for the application,
featuring a responsive design with animated interactions and visual feedback.
It includes links to major sections of the application and user controls.

Features:
- Responsive layout with dynamic width adjustments
- Animated hover effects with gradient backgrounds
- Active route highlighting
- Glassmorphism design with backdrop blur
- Smooth transitions and scaling effects
- Integrated user controls via NavbarUser component
- Client-side route handling with Next.js

Navigation Links:
- Dashboard: Overview and analytics
- Expenses: Expense management
- Reports: Financial reporting
- Settings: Application configuration

Visual Features:
- Floating design with top margin
- Border with gradient hover effect
- Backdrop blur for modern glass effect
- Scale animations on hover
- Primary color accents for active routes

## Example

```tsx
// Basic usage in layout
export default function RootLayout() {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  )
}
```
