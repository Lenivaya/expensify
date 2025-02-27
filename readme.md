# Expensify

A modern, full-stack expense tracking application that helps users manage their finances effectively.

<!--toc:start-->

- [Expensify](#expensify)
  - [Video demo](#video-demo)
    - [Overall usage](#overall-usage)
    - [OpenAPI reference (Scalar)](#openapi-reference-scalar)
    - [OpenAPI reference (Swagger)](#openapi-reference-swagger)
    - [Docusaurus documentation](#docusaurus-documentation)
    - [Storybook](#storybook)
  - [Features](#features)
  - [Basic Setup and Commands](#basic-setup-and-commands)
  - [Configuration](#configuration)
    - [Core Configuration Files](#core-configuration-files)
  - [Tech Stack](#tech-stack)
    - [Backend](#backend)
    - [Frontend](#frontend)
    - [Docs](#docs)
  - [Project Structure](#project-structure)
  - [Documentation](#documentation)
  - [Getting Started](#getting-started)
  - [Legal](#legal)
  - [License](#license)
  - [Author](#author)
  <!--toc:end-->

## Video demo

### Overall usage

[![YouTube demo](http://i.ytimg.com/vi/hXr6pItBF1o/hqdefault.jpg)](https://www.youtube.com/watch?v=hXr6pItBF1o)

_(click on images, it'll open a video)_

### OpenAPI reference (Scalar)

<https://github.com/user-attachments/assets/3c362231-5b90-4e67-a739-a3c9a268b0a9>

### OpenAPI reference (Swagger)

<https://github.com/user-attachments/assets/0aecdeba-b792-423e-a358-c53fb98f94f7>

### Docusaurus documentation

<https://github.com/user-attachments/assets/32811028-ec3a-4893-b802-e6eedced462f>

### Storybook

<https://github.com/user-attachments/assets/5f5a1603-409e-4421-9991-c3dfefd5949d>

## Features

- **Expense Tracking**: Record and categorize your expenses with ease
- **Income Management**: Track your income sources and cash inflows
- **Budget Planning**: Set and monitor budgets for different expense categories
- **Analytics Dashboard**:
  - Visual representation of spending patterns
  - Monthly balance breakdowns
  - Tag-based expense categorization
  - Financial summaries and statistics
- **User Management**: Secure authentication and profile management

## Basic Setup and Commands

For detailed setup instructions and commands, please refer to:

- [Backend Setup and Commands](./expensify-backend/README.md)
- [Frontend Setup and Commands](./expensify-frontend/README.md)

## Configuration

### Core Configuration Files

- Backend: `.env` (copy from `.env.example`)
- Frontend: `.env.local`
- Documentation: `docusaurus.config.ts`

For detailed configuration options, please refer to the respective project READMEs.

## Tech Stack

### Backend

- **Framework**: NestJS with Fastify adapter
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: JWT with Passport.js
- **API Documentation**: Swagger/OpenAPI/Scalar/Docusaurus

### Frontend

- **Framework**: Next.js 15
- **UI Components**:
  - Radix UI primitives
  - Tailwind CSS for styling
  - Lucide icons
  - Shadcn/UI
- **State Management**: TanStack Query (React Query)
- **Charts**: Recharts
- **Form Handling**: React Hook Form with Zod validation
- **Development Tools**: Storybook for component development

### Docs

Built with Docusaurus.

[Could be found here](https://lenivaya.github.io/expensify/)

## Project Structure

```sh
expensify/
├── expensify-backend/    # NestJS backend application
├── expensify-frontend/   # Next.js frontend application
└── expensify-docs/       # Docusaurus documentation
```

## Documentation

- [Frontend Readme](./expensify-frontend/README.md)
- [Backend Readme](./expensify-backend/README.md)
- [Docs Readme](./expensify-docs/README.md)

## Getting Started

1. Clone the repository
2. Follow setup instructions in:
   - [Backend Setup Guide](./expensify-backend/README.md)
   - [Frontend Setup Guide](./expensify-frontend/README.md)

## Legal

- [End User License Agreement (EULA)](./EULA.md)
- [Privacy Policy](./PRIVACY_POLICY.md)

## License

This project is licensed under the BSD 3-Clause - see the [LICENSE](./LICENSE) file for details.

License reports are available in the respective project directories. [Backend license-reports](./expensify-backend/license-report.txt), [Frontend](./expensify-frontend/license-report.txt)

## Author

- [Lenivaya](https://github.com/Lenivaya)

---

© 2025 Expensify. All rights reserved.
