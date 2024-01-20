/* eslint-disable no-param-reassign */
import { MobsterPutData } from '@/lib/mobsters/types'

import prisma from '@/lib/prisma'

export const getMobsters = async () => {
    const mobsters = await prisma.mobster.findMany({
        orderBy: { id: 'asc' },
    })
    return mobsters
}

export const getMobsterById = (id: number) =>
    prisma.mobster.findUniqueOrThrow({ where: { id } })

export const addMobster = async (mobster: MobsterPutData) => {
    const newMobster = await prisma.mobster.create({ data: mobster })
    return prisma.mobster.findUnique({ where: { id: newMobster.id } })
}
