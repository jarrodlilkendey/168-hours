# 168 Hours

## Goal of this Project

Practice writing unit, integration and end to end tests using the following technologies:

1. React / NextJS / NextAuth / Prisma / Typescript
2. React Test Library
3. Mock Service Worker
4. next-test-api-route-handler
5. Jest

Put all tests in a continuous integration pipeline using GitHub Actions.

Add monitoring and alerting capabilities to maintain quality of your application in production.

Stretch goal: look at other software quality checks I can add to the CI pipeline and learn e.g. static code analysis, Static application security testing (SAST), and dynamic application security testing (DAST).

## Features

1. Create a schedule for a walk by drag and dropping events
2. Tool displays the free time you have remaining
3. Capture a list of goals from prepopulated drop down lists
4. Schedule will be created for you showing when you can work on your goals outside of your existing commitments

## Technical Design

1. NextJS + Pages Router + API Router
2. NextAuth for authentication (using email provider as this will not be a commercial project)
3. Prisma for an ORM on top of a Postgres DB
4. Typescript
5. Vercel will be used for hosting
6. PostgresDB hosted on Supabase

## Usage

1. Follow the .env file templates to complete `.env`, `env.local`, `env.test.local`
2. Run with locally `npm run dev`
3. Run unit tests with React Test Library and Mock Service Worker via Jest using `npm run test:ui`
4. Run API integration tests with next-test-api-route-handler with Jest using `npm run test:api`
5. Run Cypress integration and E2E tests with `npm run build:test` then `npm run cypress:start`
