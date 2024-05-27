import prisma from '@/lib/prisma'
import type { NewAuthUser } from '@/lib/users/types'

export const getUsers = async () => {
    const users = await prisma.user.findMany({
        orderBy: { id: 'asc' },
    })
    console.log('getUsers', users)
    return users
}

export const getUserById = async (userId: number) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
    })
    return user
}

export const getUserByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: { email: email },
    })
    return user
}

export const addUser = async (newUserData: NewAuthUser) => {
    const newUser = await prisma.user.create({ data: newUserData })
    return prisma.user.findUnique({ where: { id: newUser.id } })
}
