import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const createUsers = async () => {
    const usersData = [
        {
            email: 'test@test.test',
            salt: 'tpsQWJ+msIv8w2lkOsnAeA/8Ssv0w927JG+RusiSFDAvL5l2OYhovRyInGn6QxFgLtuuwKbW8c1gwAR1ux7Yjy+9FJRWEb4EoVCMj15L0vUf7M4baiVqxOzZ/Z6uv0TZfrEIMjT3n+0OJ6vIs4lHkQFACkTbyzmVarzxnoErrus=',
            hash: '��N.$�ͣ��i��tRWY���BJ$c0$���P�;���\u0015\r�;2Ol�\u0014_�*�=t˓\u001av�Pq\\9 7[',
            iterations: 10000,
            keylen: 64,
            digest: 'sha512',
            id: 1,
        },
        {
            email: 'test2@test.com',
            salt: 'EmPKqzw45/WB3sbga8043oqLSzvobwGb2zd8X3Qn8G+FagqdBKs200IIX2gTmTiWUttwWjStrRHb+s20cEzeCYsw3xL+iVM8kEjzrVLqh4BA6V2pO3w9bgBx8PfQqgzm8lsA4KonAhaFbQA4uPNUprpV+Ga1TjJsXyMJ+Byws4o=',
            hash: '���\u0006\u0006�ʰ�1\u000bC��\f�A�j��@Fh�\u0004��~�\fd��gs\r�1`P\u000b<�\f��d>2����>F���/�-I',
            iterations: 10000,
            keylen: 64,
            digest: 'sha512',
            id: 2,
        },
    ]

    for (const user of usersData) {
        const existingUser = await prisma.user.findFirst({
            where: { email: user.email },
        })
        if (existingUser) {
            const result = await prisma.user.update({
                where: { id: existingUser.id },
                data: user,
            })
            console.log(`\tupdated user ${result.email}`)
        } else {
            const result = await prisma.user.create({ data: user })
            console.log(`\tcreated user ${result.email}`)
        }
    }
}

async function main() {
    console.log('Start seeding ...')
    await createUsers()
    console.log('Seeding finished.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
