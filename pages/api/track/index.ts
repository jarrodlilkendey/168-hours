import type { NextApiRequest, NextApiResponse } from 'next'

import { revalidationRoutes } from '@/lib/api/constants'
import { createHandler } from '@/lib/api/handler'
import {
    getMyTimeEntries,
    createTimeEntry,
} from '@/lib/prisma/queries/time-entries'

const handler = createHandler(revalidationRoutes.track)
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    res.json(await getMyTimeEntries())
})

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    const newTimeEntry = await createTimeEntry(req.body)

    return res.json({ timeEntry: newTimeEntry })
})

export default handler
