# Frontend

## Prerequisites

Before starting, set up the backend server by following the instructions in the [backend README](../expensify-backend/README.md).

## Environment Setup

First, create your environment configuration:

```bash
cp .env.example .env
```

### Environment Variables Reference

The following environment variables are available for configuration:

- `NEXT_PUBLIC_API_URL` - Backend API URL (default: http://localhost:3000)

## API Client Generation

Run the backend server in watch mode to generate the API specification file. Then, generate the API client using one of the following methods:

### Using justfile:

```bash
just frontend-api-client-from-spec
```

### Using openapi-qraft CLI directly:

```bash
pnpm openapi-qraft --plugin tanstack-query-react --plugin openapi-typescript ../expensify-backend/openapi-spec.yaml --output-dir lib/api
```

## Development

To start the development server:

```bash
pnpm dev
```

The terminal will display the URL where your application is running. Open this URL in your browser to view the application.

## Production

To create and run a production build:

```bash
pnpm build && pnpm start
```

## Storybook

To launch the Storybook component explorer:

```bash
pnpm storybook
```
