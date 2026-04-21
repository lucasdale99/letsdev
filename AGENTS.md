# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js App Router project. Route pages, layouts, API handlers, and route-local components live in `app/`. Shared React components live in `components/`, with reusable primitives in `components/ui/`. Database schema, migrations, email templates, and server-side handlers live in `lib/`; Drizzle migrations are under `lib/db/migrations/`. General helpers are in `utils/` and `lib/utils/`. Static assets such as favicons and images are in `public/`.

## Build, Test, and Development Commands

Use pnpm for package management.

- `pnpm install`: install dependencies from `pnpm-lock.yaml`.
- `pnpm dev`: run the local Next.js development server.
- `pnpm build`: create a production Next.js build.
- `pnpm start`: run the production server after building.
- `pnpm lint`: run ESLint across the repository.
- `pnpm db -- generate` and `pnpm db -- push`: run Drizzle Kit commands through the configured `db` script.

## Coding Style & Naming Conventions

Write TypeScript and React components using the existing App Router conventions. Use PascalCase for React components, camelCase for functions and variables, and kebab-case for route segments where appropriate. Keep server actions and database helpers close to their domain, such as `lib/handlers/subscribers/` or `lib/db/actions/`. Prefer named exports for shared helpers unless the surrounding file already uses a default export. Run `pnpm lint` before submitting changes.

## Testing Guidelines

No dedicated test runner is currently configured. For now, verify changes with `pnpm lint` and `pnpm build`. When adding behavior with meaningful branching, database effects, or user-facing flows, add focused tests with the chosen framework in a colocated `*.test.ts` or `*.test.tsx` file, and document the new test command in `package.json`.

## Commit & Pull Request Guidelines

Recent commits use short, imperative summaries such as `Fix unsubscribe path` and `Add Analytics component`. Follow that style: keep the first line concise and describe the change, not the process. Pull requests should include a clear summary, verification steps, linked issues when relevant, and screenshots or recordings for UI changes. Call out database migrations, environment variable changes, and deployment-sensitive updates explicitly.

## Security & Configuration Tips

Do not commit secrets. Local configuration should provide values such as `DATABASE_URL`, `NEXT_PUBLIC_URL`, AWS credentials, and `SES_FROM_EMAIL`. Treat migrations and email-delivery changes carefully because they affect production data and outbound communication.
