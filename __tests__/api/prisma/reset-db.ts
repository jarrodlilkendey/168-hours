/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
/* eslint-disable guard-for-in */
/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */
// adapted from https://github.com/prisma/prisma-examples/blob/latest/typescript/rest-nextjs-api-routes/prisma/seed.ts

import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient()

const deleteAll = async () => {
    await prismaClient.schedule.deleteMany()
}

const createSchedules = async () => {
    const scheduleData = [
        {
            name: 'Schedule 1',
            userId: 1,
        },
        {
            name: 'Schedule 2',
            userId: 1,
        },
    ]
    await prismaClient.schedule.createMany({ data: scheduleData })
}

export const resetDB = async () => {
    try {
        await deleteAll()
        await createSchedules()
    } catch (error) {
        console.error('Failed to seed DB')
        console.error(error)
    } finally {
        await prismaClient.$disconnect()
    }
}
