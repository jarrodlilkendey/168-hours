import type { NextApiRequest, NextApiResponse } from 'next'

import { createHandler } from '@/lib/api/handler'
import { Tool } from '@/lib/tools/types'

const handler = createHandler()

// to be used in the future for demonstrating mock service worker
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    const tools: Tool[] = [
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

    res.status(200).json(tools)
})

export default handler
