import { render, screen } from '@testing-library/react'

import type { Mobster } from '@/lib/mobsters/types'

import { mockMobsters } from '@/__mocks__/mockData'

import MobsterPage from '@/pages/mobsters/[mobsterId]'

describe('Mobster Page tests', () => {
    test('renders mobster details', async () => {
        render(
            <MobsterPage mobster={mockMobsters[0] as Mobster} error={null} />
        )

        const heading = screen.getByRole('heading', { name: /tony soprano/i })
        expect(heading).toBeInTheDocument()
    })
})
