import type { NextApiRequest, NextApiResponse } from 'next'

import { revalidationRoutes } from '@/lib/api/constants'
import { createHandler } from '@/lib/api/handler'
import { getScheduleById } from '@/lib/prisma/queries/schedules'

const handler = createHandler(revalidationRoutes.schedules)
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    const { scheduleId } = req.query
    res.json(await getScheduleById(Number(scheduleId)))
})

export default handler
