import type { NextApiRequest, NextApiResponse } from 'next'

import { revalidationRoutes } from '@/lib/api/constants'
import { createHandler } from '@/lib/api/handler'
import {
    getMyTimeEntries,
    createTimeEntry,
} from '@/lib/prisma/queries/time-entries'

import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'

const handler = createHandler(revalidationRoutes.track)

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
        res.status(400).json({ message: 'Not authorized' })
    }

    const userId = session?.user.user.id
    if (!userId) {
        res.status(400).json({ message: 'Not authorized' })
    }

    res.json(await getMyTimeEntries(userId))
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

    const { label, start, end, projectId } = req.body
    const newTimeEntry = await createTimeEntry({
        label,
        start,
        end,
        projectId,
        userId,
    })

    return res.json({ timeEntry: newTimeEntry })
})

export default handler
