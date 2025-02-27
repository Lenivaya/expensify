dev-container:
  docker compose -f dev.docker-compose.yaml up -d

backend-dev:
  cd ./expensify-backend/ && pnpm start:dev

frontend-dev:
  cd ./expensify-frontend/ && pnpm dev
frontend-dev-storybook:
  cd ./expensify-frontend/ && pnpm storybook
frontend-api-client-from-spec:
  cd ./expensify-frontend/ && pnpm openapi-qraft --plugin tanstack-query-react --plugin openapi-typescript ../expensify-backend/openapi-spec.yaml --output-dir lib/api
frontend-sync-mds:
  cp EULA.md ./expensify-frontend/public
  cp PRIVACY_POLICY.md ./expensify-frontend/public

docs-dev:
  cd ./expensify-docs/ && pnpm start
docs-autogen:
  cd ./expensify-docs/ && pnpm gen:docs
