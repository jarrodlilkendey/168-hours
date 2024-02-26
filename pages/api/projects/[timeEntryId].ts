import type { NextApiRequest, NextApiResponse } from 'next'

import { revalidationRoutes } from '@/lib/api/constants'
import { createHandler } from '@/lib/api/handler'
import {
    updateTimeEntry,
    deleteTimeEntry,
    stopTimeEntry,
} from '@/lib/prisma/queries/time-entries'

const handler = createHandler(revalidationRoutes.track)

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { timeEntryId } = req.query
    const { timerStatus } = req.body
    console.log(
        '[timeEntryId] POST',
        'req.body',
        req.body,
        'req.query',
        req.query
    )

    console.log('timerStatus', timerStatus)

    if (timerStatus == 'delete') {
        console.log('[timeEntryId] POST - delete')
        res.json(await deleteTimeEntry(Number(timeEntryId)))
    } else if (timerStatus == 'stop') {
        console.log('[timeEntryId] POST - stop')
        res.json(await stopTimeEntry(Number(timeEntryId)))
    } else {
        console.log('[timeEntryId] POST - 400')
        res.send(400)
    }
})

// handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
//     const { scheduleId } = req.query
//     res.json(await getScheduleById(Number(scheduleId)))
// })

export default handler
