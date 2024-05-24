import type { NextApiRequest, NextApiResponse } from 'next'
import nextConnect, { NextConnect, NextHandler } from 'next-connect'

import { processApiError } from '@/lib/api/utils'

type Handler = NextConnect<NextApiRequest, NextApiResponse<any>>

export const createHandler = (revalidationRoutes?: Array<string>) =>
    nextConnect({
        onError(error, req: NextApiRequest, res: NextApiResponse) {
            const { status, message } = processApiError(error)
            return res.status(status).json({ message })
        },
        onNoMatch(req: NextApiRequest, res: NextApiResponse) {
            return res.status(405).end(`Method ${req.method} Not Allowed`)
        },
    }).use((req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
        const revalidateMethods = ['put', 'patch', 'delete']
        if (
            revalidationRoutes &&
            revalidationRoutes.length > 0 &&
            revalidateMethods.includes(req.method?.toLocaleLowerCase() ?? '') &&
            req.query.secret !== process.env.REVALIDATION_SECRET
        ) {
            return res
                .status(401)
                .json({ message: 'Invalid revalidation token' })
        }

        // otherwise, no need to validate revalidation secret
        return next()
    })
