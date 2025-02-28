# Function: GoBackButton()

> **GoBackButton**(`__namedParameters`): `Element`

A reusable button component for navigation back to the previous page

## Parameters

### \_\_namedParameters

`GoBackButtonProps`

## Returns

`Element`

## Description

This component provides a consistent way to navigate back in the application history.
It combines Next.js router navigation with optional custom click handling.

Features:
- Animated arrow icon on hover
- Customizable text
- Optional click handler for additional functionality
- Consistent styling with the application's design system
- Accessible interactive elements

## Example

```tsx
// Basic usage
<GoBackButton />

// With custom text and click handler
<GoBackButton
  text="Return to dashboard"
  onClick={() => console.log('Navigating back')}
/>
```
