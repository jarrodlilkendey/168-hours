# 168 Hours

## Goal of this Project

Practice writing unit, integration and end to end tests using the following technologies:

1. React / NextJS / NextAuth / Prisma / Typescript
2. React Test Library
3. Mock Service Worker
4. next-test-api-route-handler
5. Jest

Put all tests in a continuous integration continous deployment pipeline using GitHub Actions.

Self host the web application and database using infrastructure as code with Digital Ocean, to gain further experience managing these components in production without relying on managed providers such as Vercel, Supabase or AWS managed databases.

## Usage

1. Follow the .env file templates to complete `.env`, `env.local`, `env.test.local`
2. Run with locally `npm run dev`
3. Run unit tests with React Test Library and Mock Service Worker via Jest using `npm run test:ui`
4. Run API integration tests with next-test-api-route-handler with Jest using `npm run test:api`
5. Run Cypress integration and E2E tests with `npm run build:test` then `npm run cypress:start`

## Features

1. Free Time Calculator: Calculate how much free time you have in a week
2. Time Tracker: Track how you actually spend your time
3. Schedule Maker: Create a weekly schedule

## Technical Design

1. NextJS + Pages Router + API Router
2. NextAuth for authentication (using email provider as this will not be a commercial project)
3. Prisma for an ORM on top of a Postgres DB
4. Typescript
5. The application will be Dockerized and hosted using Docker Compose on a Digital Ocean VPS
6. PostgresDB self hosted on a Digital Ocean VPS
7. Terraform and Ansible for infrastructure as code and configuration management

## Todo

-   [ ] Fix broken API route tests returning 405s
-   [ ] Implement some tests with mock service worker
-   [ ] Implement observability
-   [ ] Implement security scans including static code analysis, static application security testing (SAST), and dynamic application security testing (DAST)
-   [ ] Implement infra as code for a dev and prod environment for both the application server and the database server
-   [ ] Migrate from docker compose into kubernetes for hosting the applucation
-   [ ] Improve application look in feel
-   [ ] Remove hardcoding of test user within the API routes
-   [x] Implement create user flow
