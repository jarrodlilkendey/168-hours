/* eslint-disable no-param-reassign */
import { TimeEntryPutData, TimeEntryPatchData } from '@/lib/timeEntries/types'

import prisma from '@/lib/prisma'
import { TimeEntry } from '@prisma/client'

export const getMyTimeEntries = async (userId: number) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
    })

    if (!user) {
        throw new Error('User not found')
    }

    const timeEntries = await prisma.timeEntry.findMany({
        orderBy: { id: 'desc' },
        where: { userId: user.id },
    })

    return timeEntries
}

export const getTimeEntryById = (id: number) =>
    prisma.timeEntry.findUniqueOrThrow({ where: { id } })

export const createTimeEntry = async (timeEntry: TimeEntryPutData) => {
    const newTimeEntry: TimeEntry = await prisma.timeEntry.create({
        data: timeEntry,
    })

    return prisma.timeEntry.findUnique({ where: { id: newTimeEntry.id } })
}

export const updateTimeEntry = async (timeEntry: TimeEntryPatchData) => {
    const updatedTimeEntry: TimeEntry = await prisma.timeEntry.update({
        where: { id: timeEntry.id },
        data: timeEntry,
    })

    return prisma.timeEntry.findUnique({ where: { id: updatedTimeEntry.id } })
}

export const deleteTimeEntry = async (id: number) => {
    return prisma.timeEntry.delete({ where: { id } })
}

export const stopTimeEntry = async (id: number) => {
    const updatedTimeEntry: TimeEntry = await prisma.timeEntry.update({
        where: { id: id },
        data: {
            end: new Date(),
        },
    })

    return prisma.timeEntry.findUnique({ where: { id: updatedTimeEntry.id } })
}
