import { http } from 'msw'

import { mockSchedules } from '@/__mocks__/mockData'

export const getHandlers = [
    http.get('/http://localhost:3000/api/schedules', () => {
        return new Response(JSON.stringify(mockSchedules), {
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }),
]
