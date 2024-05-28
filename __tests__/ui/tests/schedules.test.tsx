import { render, screen } from '@testing-library/react'
// import { mockTools } from '@/__mocks__/mockData'

import MySchedulesPage from '@/pages/schedules'

describe('My Schedules Page tests', () => {
    test('renders a heading', async () => {
        render(<MySchedulesPage />)

        expect(
            screen.getByRole('heading', { name: 'My Schedules' })
        ).toBeInTheDocument()
    })

    test('renders a button', async () => {
        render(<MySchedulesPage />)

        expect(
            screen.getByRole('button', { name: 'Create a Schedule' })
        ).toBeInTheDocument()
    })
})
