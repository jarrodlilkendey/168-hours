/* eslint-disable no-param-reassign */
import { SchedulePutData } from '@/lib/schedules/types'

import prisma from '@/lib/prisma'

export const getMySchedules = async () => {
    const user = await prisma.user.findUnique({
        where: { email: 'test@test.test' },
    })

    if (!user) {
        throw new Error('User not found')
    }

    const schedules = await prisma.schedule.findMany({
        orderBy: { id: 'asc' },
        where: { userId: user.id },
    })

    console.log('schedules', schedules)

    return schedules
}

export const getScheduleById = (id: number) =>
    prisma.schedule.findUniqueOrThrow({ where: { id } })

export const createSchedule = async (schedule: SchedulePutData) => {
    // console.log('createSchedule', schedule)
    const newSchedule = await prisma.schedule.create({ data: schedule })
    // console.log('createSchedule', newSchedule)
    return prisma.schedule.findUnique({ where: { id: newSchedule.id } })
}
