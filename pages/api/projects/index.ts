import type { NextApiRequest, NextApiResponse } from 'next'

import { revalidationRoutes } from '@/lib/api/constants'
import { createHandler } from '@/lib/api/handler'
import { getMyProjects, createProject } from '@/lib/prisma/queries/projects'

const handler = createHandler(revalidationRoutes.track)
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    res.json(await getMyProjects())
})

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    const newProject = await createProject(req.body)

    return res.json({ project: newProject })
})

export default handler
