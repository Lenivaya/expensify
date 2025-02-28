# Expensify

Modern, full-stack expense tracking application with rich analytics and budgeting features.

<!--toc:start-->

- [Expensify](#expensify)
  - [Video Demo](#video-demo)
    - [Overall Usage](#overall-usage)
    - [OpenAPI Reference (Scalar)](#openapi-reference-scalar)
    - [OpenAPI Reference (Swagger)](#openapi-reference-swagger)
    - [Docusaurus Documentation](#docusaurus-documentation)
    - [Storybook](#storybook)
  - [Key Features](#key-features)
  - [Quick Start](#quick-start)
  - [Tech Stack](#tech-stack)
    - [Backend](#backend)
    - [Frontend](#frontend)
    - [Documentation](#documentation)
  - [Project Structure](#project-structure)
  - [Documentation](#documentation)
  - [Legal](#legal)
  <!--toc:end-->

## Video Demo

### Overall Usage

[![YouTube demo](http://i.ytimg.com/vi/hXr6pItBF1o/hqdefault.jpg)](https://www.youtube.com/watch?v=hXr6pItBF1o)

_(click on images, it'll open a video)_

### OpenAPI Reference (Scalar)

<https://github.com/user-attachments/assets/3c362231-5b90-4e67-a739-a3c9a268b0a9>

### OpenAPI Reference (Swagger)

<https://github.com/user-attachments/assets/0aecdeba-b792-423e-a358-c53fb98f94f7>

### Docusaurus Documentation

<https://github.com/user-attachments/assets/32811028-ec3a-4893-b802-e6eedced462f>

### Storybook

<https://github.com/user-attachments/assets/5f5a1603-409e-4421-9991-c3dfefd5949d>

## Key Features

- 📊 **Comprehensive Analytics Dashboard**
  - Visual spending patterns
  - Monthly breakdowns
  - Tag-based categorization
  - Financial summaries
- 💰 **Financial Management**
  - Expense tracking and categorization
  - Income source management
  - Budget planning and monitoring
- 🔐 **User System**
  - Secure JWT authentication
  - Profile customization
  - Multi-device support

## Quick Start

1. Clone the repository
2. Set up backend:

   ```bash
   cd expensify-backend
   cp .env.example .env
   pnpm install
   pnpm start:dev
   ```

3. Set up frontend:

   ```bash
   cd expensify-frontend
   cp .env.example .env
   pnpm install
   pnpm dev
   ```

Detailed setup instructions in [Backend](./expensify-backend/README.md) and [Frontend](./expensify-frontend/README.md) READMEs.

## Tech Stack

### Backend

- NestJS with Fastify
- PostgreSQL + Drizzle ORM
- JWT authentication
- OpenAPI documentation

### Frontend

- Next.js 15
- Radix UI + Shadcn/UI
- TanStack Query
- Recharts
- React Hook Form + Zod

### Documentation

- Docusaurus ([View Docs](https://lenivaya.github.io/expensify/))
- Storybook ([View storybook](https://67be4bbc08c1819973a92b99-xahpphwsjl.chromatic.com/))
- OpenAPI (Swagger/Scalar)

## Project Structure

```sh
expensify/
├── expensify-backend/    # NestJS API
├── expensify-frontend/   # Next.js SPA
└── expensify-docs/       # Documentation
```

## Documentation

- [API Documentation](https://lenivaya.github.io/expensify/)
- [Frontend Guide](./expensify-frontend/README.md)
- [Backend Guide](./expensify-backend/README.md)
- [Documentation Guide](./expensify-docs/README.md)

## Legal

- [License](./LICENSE) - BSD 3-Clause
- [EULA](./EULA.md)
- [Privacy Policy](./PRIVACY_POLICY.md) - GDPR Compliant Data Protection Policy
- [License Reports](./expensify-backend/license-report.txt)

---

© 2025 [Lenivaya](https://github.com/Lenivaya). All rights reserved.
