import type { NextApiRequest, NextApiResponse } from 'next'

import { revalidationRoutes } from '@/lib/api/constants'
import { createHandler } from '@/lib/api/handler'
import { getMySchedules, createSchedule } from '@/lib/prisma/queries/schedules'

import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'

const handler = createHandler(revalidationRoutes.schedules)

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
        res.status(400).json({ message: 'Not authorized' })
    }

    const userId = session?.user.user.id
    if (!userId) {
        res.status(400).json({ message: 'Not authorized' })
    }

    res.json(await getMySchedules(userId))
})

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
        res.status(400).json({ message: 'Not authorized' })
    }

    const userId = session?.user.user.id
    if (!userId) {
        res.status(400).json({ message: 'Not authorized' })
    }

    const { name } = req.body
    const newSchedule = await createSchedule({ name, userId })
    return res.json({ schedule: newSchedule })
})

export default handler
