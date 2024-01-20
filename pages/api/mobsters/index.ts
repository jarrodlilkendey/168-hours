import type { NextApiRequest, NextApiResponse } from 'next'

import { revalidationRoutes } from '@/lib/api/constants'
import { createHandler } from '@/lib/api/handler'
import { getMobsters, addMobster } from '@/lib/prisma/queries/mobsters'

const handler = createHandler(revalidationRoutes.mobsters)
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    res.json(await getMobsters())
})

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    console.log(
        'secret validation',
        req.query.secret,
        process.env.REVALIDATION_SECRET,
        req.body
    )
    // Check for secret to confirm this is a valid request
    if (req.query.secret !== process.env.REVALIDATION_SECRET) {
        return res.status(401).json({ message: 'Invalid revalidation token' })
    }

    // add mobster (here is where authorization would be validated)
    const addedMobster = await addMobster(req.body)

    // revalidate mobsters page for ISR
    await res.revalidate('/mobsters')

    return res.json({ mobster: addedMobster, revalidated: true })
})

export default handler
