/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
/* eslint-disable guard-for-in */
/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */
// adapted from https://github.com/prisma/prisma-examples/blob/latest/typescript/rest-nextjs-api-routes/prisma/seed.ts

import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient()

const deleteAll = async () => {
    await prismaClient.mobster.deleteMany()
}

const createMobsters = async () => {
    const mobsterData = [
        {
            name: 'tony soprano',
        },
        {
            name: 'paulie walnuts',
        },
        {
            name: 'christopher moltisanti',
        },
    ]
    await prismaClient.mobster.createMany({ data: mobsterData })
}

export const resetDB = async () => {
    try {
        await deleteAll()
        await createMobsters()
    } catch (error) {
        console.error('Failed to seed DB')
        console.error(error)
    } finally {
        await prismaClient.$disconnect()
    }
}
