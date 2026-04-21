# Next.js Blog with Drizzle ORM and Neon PostgreSQL

A modern blog platform built with Next.js, Drizzle ORM for database operations, and Neon PostgreSQL for the database.

## Prerequisites

- Node.js 20.9+ installed
- AWS account configured
- Neon PostgreSQL database created
- pnpm package manager

## Project Setup

1. Install pnpm globally:

```bash
npm install -g pnpm
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.local
```

```bash
DATABASE_URL=your_neon_postgres_connection_string
NEXT_PUBLIC_URL=http://localhost:3000
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
SES_FROM_EMAIL=lucas@letusdev.io
```

4. Generate and push Drizzle ORM schema:

```bash
drizzle-kit generate
drizzle-kit push
```

5. Build and run the production server:

```bash
pnpm build
pnpm start
```

## Project Structure

```bash
├── app/ # Next.js app directory
│ ├── api/ # API routes
│ ├── blog/ # Blog pages
│ └── components/ # Shared components
├── lib/ # Utility functions and configurations
│ ├── db.ts # Database connection
│ └── schema.ts # Drizzle schema definitions
├── migrations/ # Database migrations
└── drizzle.config.ts # Drizzle ORM configuration
```

## Database Setup

1. Create a Neon PostgreSQL database at [neon.tech](https://neon.tech)
2. Get your connection string from the Neon dashboard
3. Add the connection string to your `.env.local` file
4. Run migrations to set up your database schema

## Documentation References

- [Drizzle Docs](https://orm.drizzle.team/docs/get-started-postgresql)
- [Neon Docs](https://neon.tech/docs/introduction)
- [Next.js Docs](https://nextjs.org/docs)

## Contributing

1. Fork the repository
2. Create a feature branch or create an issue
3. Submit a pull request
