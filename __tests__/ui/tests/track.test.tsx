import { render, screen } from '@testing-library/react'
// import { mockTools } from '@/__mocks__/mockData'

import TimeTrackerPage from '@/pages/track'

describe('Time Tracker Page tests', () => {
    test('renders a heading', async () => {
        render(<TimeTrackerPage />)

        expect(
            screen.getByRole('heading', { name: 'Time Tracker' })
        ).toBeInTheDocument()
    })
})
