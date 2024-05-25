import { Schedule } from '@prisma/client'

export const mockSchedules: Array<Schedule> = [
    {
        id: 1,
        name: 'Schedule 1',
        userId: 1,
    },
    {
        id: 2,
        name: 'Schedule 2',
        userId: 1,
    },
]
