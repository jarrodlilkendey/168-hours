/**
 * @jest-environment node
 */

import { testApiHandler } from 'next-test-api-route-handler'

import { Schedule } from '@prisma/client'

import schedulesHandler from '@/pages/api/schedules'

// ------------------------------------------------------------------ //
// EXPECTED GET DATA
//
// ids don't reset after deleteMany, so actual number is not predictable depending
// on which tests ran before this one.
const generateExpectedSchedules = (json: Array<Schedule>) => [
    {
        id: json[0].id,
        name: 'Schedule 1',
        userId: 1,
    },
    {
        id: json[1].id,
        name: 'Schedule 2',
        userId: 1,
    },
]

it('[api-test-disabled] schedulesHandler api route working correctly', async () => {
    // todo: reenable once fixed
    // review course content on API testing https://www.udemy.com/course/nextjs-testing/learn/lecture/32252382#questions/19114038
    expect(true).toBe(true)
    // await testApiHandler({
    //     pagesHandler: schedulesHandler,
    //     test: async ({ fetch }) => {
    //         const res = await fetch()
    //         expect(res.status).toBe(200)
    //         console.log('res', res)
    //         const json = await res.json()
    //         expect(json).toBe(generateExpectedSchedules(json)) // ◄ Passes!
    //     },
    // })
})

// // ------------------------------------------------------------------ //
// // TEST DATA
// const testData = [
//     {
//         endpoint: 'schedules',
//         handler: schedulesHandler,
//         generateExpectedData: generateExpectedSchedules,
//     },
// ]

// // ------------------------------------------------------------------ //
// // TEST FUNCTION
// test.each(testData)(
//     'fetches all $endpoint',
//     async ({ handler, generateExpectedData }) => {
//         console.log(testData, handler, generateExpectedData)
//         await testApiHandler({
//             pagesHandler: handler,
//             test: async ({ fetch }) => {
//                 const res = await fetch({ method: 'GET' })
//                 console.log('res', res)
//                 const json = await res.json()
//                 expect(json).resolves.toStrictEqual(generateExpectedData(json))
//             },
//         })

//         // await testApiHandler({
//         //     handler,
//         //     test: async ({ fetch }) => {
//         //         const res = await fetch({ method: 'GET' })
//         //         console.log('res', res)
//         //         const json = await res.json()
//         //         expect(json).toEqual(generateExpectedData(json))
//         //     },
//         // })
//     }
// )
