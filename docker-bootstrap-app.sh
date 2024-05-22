#!/bin/sh
npm run prisma:migrate:deploy
node server.js