# Next.js Blog with SST, Drizzle ORM, and Neon PostgreSQL

A modern blog platform built with Next.js, utilizing SST for infrastructure, Drizzle ORM for database operations, and Neon PostgreSQL for the database.

## Prerequisites

- Node.js 18+ installed
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
```

4. Generate and push Drizzle ORM schema:

```bash
drizzle-kit generate
drizzle-kit push
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
├── sst.config.ts # SST configuration
└── drizzle.config.ts # Drizzle ORM configuration
```

## Database Setup

1. Create a Neon PostgreSQL database at [neon.tech](https://neon.tech)
2. Get your connection string from the Neon dashboard
3. Add the connection string to your `.env.local` file
4. Run migrations to set up your database schema

## Infrastructure with SST

This project uses SST v3 for infrastructure management. Key components:

1. Configure your AWS credentials
2. Update `sst.config.ts` with your stack settings
3. Deploy to AWS:

```bash
pnpm deploy
```

## Deploying Secrets to Environments

```bash
sst secret set DATABASE_URL <your_neon_postgres_connection_string> --env <environment>
sst secret set NEXT_PUBLIC_URL <your_next_public_url> --env <environment>
```

## Documentation References

- [SST Docs](https://sst.dev/docs/)
- [Drizzle Docs](https://orm.drizzle.team/docs/get-started-postgresql)
- [Neon Docs](https://neon.tech/docs/introduction)
- [Next.js Docs](https://nextjs.org/docs)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Submit a pull request
