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

// ------------------------------------------------------------------ //
// TEST DATA
const testData = [
    {
        endpoint: 'schedules',
        handler: schedulesHandler,
        generateExpectedData: generateExpectedSchedules,
    },
]

// ------------------------------------------------------------------ //
// TEST FUNCTION
test.each(testData)(
    'fetches all $endpoint',
    async ({ handler, generateExpectedData }) => {
        await testApiHandler({
            handler,
            test: async ({ fetch }) => {
                const res = await fetch({ method: 'GET' })
                const json = await res.json()
                expect(json).toEqual(generateExpectedData(json))
            },
        })
    }
)
