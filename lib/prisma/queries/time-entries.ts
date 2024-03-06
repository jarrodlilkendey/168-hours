/* eslint-disable no-param-reassign */
import { TimeEntryPutData, TimeEntryPatchData } from '@/lib/timeEntries/types'

import prisma from '@/lib/prisma'
import { TimeEntry } from '@prisma/client'

export const getMyTimeEntries = async () => {
    const user = await prisma.user.findUnique({
        where: { email: 'test@test.test' },
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
    console.log('createTimeEntry', timeEntry)

    const newTimeEntry: TimeEntry = await prisma.timeEntry.create({
        data: timeEntry,
    })

    return prisma.timeEntry.findUnique({ where: { id: newTimeEntry.id } })
}

export const updateTimeEntry = async (timeEntry: TimeEntryPatchData) => {
    console.log('updateTimeEntry', timeEntry)

    const updatedTimeEntry: TimeEntry = await prisma.timeEntry.update({
        where: { id: timeEntry.id },
        data: timeEntry,
    })

    return prisma.timeEntry.findUnique({ where: { id: updatedTimeEntry.id } })
}

export const deleteTimeEntry = async (id: number) => {
    console.log('deleteTimeEntry', id)
    return prisma.timeEntry.delete({ where: { id } })
}

export const stopTimeEntry = async (id: number) => {
    console.log('stopTimeEntry', id)
    const updatedTimeEntry: TimeEntry = await prisma.timeEntry.update({
        where: { id: id },
        data: {
            end: new Date(),
        },
    })

    console.log('stopTimeEntry', updatedTimeEntry)

    return prisma.timeEntry.findUnique({ where: { id: updatedTimeEntry.id } })
}
