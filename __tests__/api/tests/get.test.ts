import { testApiHandler } from 'next-test-api-route-handler'

import { Mobster } from '@prisma/client'

import mobsterHandler from '@/pages/api/mobsters'

// ------------------------------------------------------------------ //
// EXPECTED GET DATA
//
// ids don't reset after deleteMany, so actual number is not predictable depending
// on which tests ran before this one.
const generateExpectedMobsters = (json: Array<Mobster>) => [
    {
        id: json[0].id,
        name: 'tony soprano',
    },
    {
        id: json[1].id,
        name: 'paulie walnuts',
    },
    {
        id: json[2].id,
        name: 'christopher moltisanti',
    },
]

// ------------------------------------------------------------------ //
// TEST DATA
const testData = [
    {
        endpoint: 'mobsters',
        handler: mobsterHandler,
        generateExpectedData: generateExpectedMobsters,
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
