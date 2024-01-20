// import { AuthUser, createJWT, hashPassword, passwordIsValid } from "../auth";
// import { AuthRequest } from "../middlewares";
import type { NextApiRequest, NextApiResponse } from 'next'

import { createHandler } from '@/lib/api/handler'
import { getUserByEmail } from '@/lib/prisma/queries/users'
import type { AuthUser } from '@/lib/users/types'
import { passwordIsValid, removePasswordandAddToken } from '@/lib/users/utils'

const handler = createHandler()
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, password } = req.body

    console.log('users api route handler', email, password)

    // auth user
    const dbUser = (await getUserByEmail(email)) as AuthUser
    console.log('dbUser', dbUser)

    if (!dbUser) return res.status(400).json({ message: 'Invalid login' })

    let validUser = null
    if (passwordIsValid(password, dbUser)) {
        validUser = dbUser
    }

    // const validUser = users.reduce(
    //     (foundUser: AuthUser | null, user) =>
    //         user.email === email && passwordIsValid(password, user)
    //             ? user
    //             : foundUser,
    //     null
    // )

    if (!validUser) return res.status(400).json({ message: 'Invalid login' })

    // create jwt
    const user = removePasswordandAddToken(validUser)

    return res.status(200).json({ user })
})

export default handler
