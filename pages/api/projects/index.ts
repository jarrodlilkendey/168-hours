import type { NextApiRequest, NextApiResponse } from 'next'

import { revalidationRoutes } from '@/lib/api/constants'
import { createHandler } from '@/lib/api/handler'
import { getMyProjects, createProject } from '@/lib/prisma/queries/projects'

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

    res.json(await getMyProjects(userId))
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
    const newProject = await createProject({ name, userId })
    return res.json({ project: newProject })
})

export default handler
