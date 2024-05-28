/* eslint-disable no-param-reassign */
import { SchedulePutData } from '@/lib/schedules/types'

import prisma from '@/lib/prisma'

export const getMySchedules = async (userId: number) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
    })

    if (!user) {
        throw new Error('User not found')
    }

    const schedules = await prisma.schedule.findMany({
        orderBy: { id: 'asc' },
        where: { userId: user.id },
    })

    return schedules
}

export const getScheduleById = (id: number) =>
    prisma.schedule.findUniqueOrThrow({ where: { id } })

export const createSchedule = async (schedule: SchedulePutData) => {
    const newSchedule = await prisma.schedule.create({ data: schedule })
    return prisma.schedule.findUnique({ where: { id: newSchedule.id } })
}
