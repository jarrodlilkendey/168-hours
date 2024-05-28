import { http } from 'msw'

import { mockSchedules, mockTools } from '@/__mocks__/mockData'

export const getHandlers = [
    http.get('/http://localhost:3000/api/schedules', () => {
        return new Response(JSON.stringify(mockSchedules), {
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }),
    http.get('/http://localhost:3000/api/tools', () => {
        return new Response(JSON.stringify(mockTools), {
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }),
]
