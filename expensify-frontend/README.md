# Frontend

Setup your backend server by following the instructions in the [backend README](../expensify-backend/README.md).

Run the backend server in watch mode, which will generate the api spec file.

With it you may generate the api client and use it in the frontend. (or use existing one if you didn't change the API code):

either by using justfile:

```sh
just frontend-api-client-from-spec
```

or by using the openapi-qraft cli:

```sh
pnpm openapi-qraft --plugin tanstack-query-react --plugin openapi-typescript ../expensify-backend/openapi-spec.yaml --output-dir lib/api
```

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open the browser and go to url from your terminal, you should see the app.

## Production build

```bash
pnpm build && pnpm start
```

## Storybook

To run the storybook, you can run the following command:

```bash
pnpm storybook
```
