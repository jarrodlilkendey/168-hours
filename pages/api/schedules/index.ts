import type { NextApiRequest, NextApiResponse } from 'next'

import { revalidationRoutes } from '@/lib/api/constants'
import { createHandler } from '@/lib/api/handler'
import { getMySchedules, createSchedule } from '@/lib/prisma/queries/schedules'

const handler = createHandler(revalidationRoutes.schedules)
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    res.json(await getMySchedules())
})

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    const newSchedule = await createSchedule(req.body)

    return res.json({ schedule: newSchedule })
})

export default handler
