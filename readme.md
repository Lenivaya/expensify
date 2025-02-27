# Expensify

A modern, full-stack expense tracking application that helps users manage their finances effectively.

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

```
expensify/
├── expensify-backend/    # NestJS backend application
├── expensify-frontend/   # Next.js frontend application
└── expensify-docs/      # Docusaurus documentation
```

## Documentation

- [Frontend Readme](./expensify-frontend/README.md)
- [Backend Readme](./expensify-backend/README.md)
- [System Readme](./expensify-docs/README.md)

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

## Author

- [Lenivaya](https://github.com/Lenivaya)

---

© 2024 Expensify. All rights reserved.
