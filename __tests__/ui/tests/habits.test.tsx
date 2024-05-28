import { render, screen } from '@testing-library/react'
// import { mockTools } from '@/__mocks__/mockData'

import HabitsPage from '@/pages/habits'

describe('Time Tracker Page tests', () => {
    test('renders a heading', async () => {
        render(<HabitsPage />)

        expect(
            screen.getByRole('heading', { name: 'Habit Tracker' })
        ).toBeInTheDocument()
    })
})
