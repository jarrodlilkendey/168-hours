import type { NextApiRequest, NextApiResponse } from 'next'

import { createHandler } from '@/lib/api/handler'
import { getUserByEmail, addUser } from '@/lib/prisma/queries/users'
import type { AuthUser } from '@/lib/users/types'
import { hashPassword } from '@/lib/users/utils'

const MINIMUM_PASSWORD_LENGTH = 4

const handler = createHandler()

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, password } = req.body

    if (password.length < MINIMUM_PASSWORD_LENGTH) {
        return res.status(400).json({ message: 'Invalid password' })
    }

    // lookup user by email in the database, if email is already assigned to a user
    // return status code 400
    const dbUser = (await getUserByEmail(email)) as AuthUser
    if (dbUser) {
        return res.status(400).json({ message: 'Invalid credentials' })
    }

    const hashedPassword = hashPassword(password)
    const { salt, hash, iterations, keylen, digest } = hashedPassword

    const newUser = await addUser({
        email,
        salt,
        hash,
        iterations,
        keylen,
        digest,
    })

    if (!newUser) {
        return res.status(400).json({ message: 'User creation failed' })
    }

    res.status(200).json({ message: 'User creation success' })
})

export default handler
