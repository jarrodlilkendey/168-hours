import type { NextApiRequest, NextApiResponse } from 'next'

import { createHandler } from '@/lib/api/handler'
import { getUserByEmail } from '@/lib/prisma/queries/users'
import type { AuthUser } from '@/lib/users/types'
import { passwordIsValid, removePasswordandAddToken } from '@/lib/users/utils'

const handler = createHandler()

// this API route will accept a POST request containing the user's email and
// password in the request body and will check the user's email is in the
// database and that the password is correct and will return  a status code
// of 200 if the user's credentials are valid and provide a JWT
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, password } = req.body

    // lookup user by email in the database
    const dbUser = (await getUserByEmail(email)) as AuthUser

    if (!dbUser) return res.status(400).json({ message: 'Invalid login' })

    let validUser = null
    // validate the user's password is correct
    if (passwordIsValid(password, dbUser)) {
        validUser = dbUser
    }

    if (!validUser) return res.status(400).json({ message: 'Invalid login' })

    // create jwt
    const user = removePasswordandAddToken(validUser)

    return res.status(200).json({ user })
})

export default handler
