# withAuth

Higher-order component for protecting routes that require authentication

## Description

A higher-order component (HOC) that provides authentication protection for routes
and components. It automatically redirects unauthenticated users to the sign-in
page and renders the protected component only for authenticated users.

Features:
- Automatic authentication checking
- Client-side route protection
- Seamless sign-in redirection
- TypeScript support with generics
- Preserves component props
- Zero configuration required

Usage Patterns:
1. Page Protection:
   Wrap Next.js page components to protect entire routes
2. Component Protection:
   Wrap individual components to show only to authenticated users
3. Feature Protection:
   Protect specific features or sections within a page

## Template

The props type of the wrapped component

## Example

```tsx
// Protect a page component
function DashboardPage(props: DashboardProps) {
  return <div>Protected Dashboard Content</div>
}
export default withAuth(DashboardPage)

// Protect a component
const ProtectedFeature = withAuth(({ data }: FeatureProps) => (
  <div>Protected Feature: {data}</div>
))

// Use in a parent component
function App() {
  return (
    <div>
      <h1>Public Content</h1>
      <ProtectedFeature data="sensitive" />
    </div>
  )
}
```

## Functions

- [withAuth](functions/withAuth.md)
