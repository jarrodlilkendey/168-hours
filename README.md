# 168 Hours

## Goal of this Project

Practice writing unit, integration and end to end tests using the following technologies:

1. React / NextJS / NextAuth / Prisma / Typescript
2. React Test Library
3. Mock Service Worker
4. next-test-api-route-handler
5. Jest

Put all tests in a continuous integration pipeline using GitHub Actions.

Stretch goal: look at other software quality checks I can add to the CI pipeline and learn e.g. static code analysis, Static application security testing (SAST), and dynamic application security testing (DAST).

## Features

## Usage

1. Follow the .env file templates to complete `.env`, `env.local`, `env.test.local`
2. Run with locally `npm run dev`
3. Run unit tests with React Test Library and Mock Service Worker via Jest using `npm run test:ui`
4. Run API integration tests with next-test-api-route-handler with Jest using `npm run test:api`
5. Run Cypress integration and E2E tests with `npm run build:test` then `npm run cypress:start`
