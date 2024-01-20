import { rest } from 'msw'

import { mockMobsters } from '@/__mocks__/mockData'

export const getHandlers = [
    rest.get('http://localhost:3000/api/mobsters', (req, res, ctx) =>
        res(ctx.json(mockMobsters))
    ),
]
