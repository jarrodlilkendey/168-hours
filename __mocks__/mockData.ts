import { Tool } from '@/lib/tools/types'
import { Schedule } from '@prisma/client'

export const mockTools: Array<Tool> = [
    {
        name: 'Free Time Calculator',
        link: '/freetime',
        description: 'Calculate how much free time you have in a week',
        testId: 'freetime-tool-card',
    },
    {
        name: 'Time Tracker',
        link: '/track',
        description: 'Track how you actually spend your time',
        testId: 'track-tool-card',
    },
    {
        name: 'Schedule Maker',
        link: '/schedules',
        description: 'Create a weekly schedule',
        testId: 'schedules-tool-card',
    },
    {
        name: 'Habit Tracker',
        link: '/habits',
        description: 'Track your habits over a month',
        testId: 'habits-tool-card',
    },
]

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
