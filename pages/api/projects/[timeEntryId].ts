import type { NextApiRequest, NextApiResponse } from 'next'

import { revalidationRoutes } from '@/lib/api/constants'
import { createHandler } from '@/lib/api/handler'
import {
    deleteTimeEntry,
    stopTimeEntry,
} from '@/lib/prisma/queries/time-entries'

const handler = createHandler(revalidationRoutes.track)

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { timeEntryId } = req.query
    const { timerStatus } = req.body

    if (timerStatus == 'delete') {
        res.json(await deleteTimeEntry(Number(timeEntryId)))
    } else if (timerStatus == 'stop') {
        res.json(await stopTimeEntry(Number(timeEntryId)))
    } else {
        res.send(400)
    }
})

export default handler
