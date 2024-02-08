import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import FreeTimePage from '../../../pages/freetime'

describe('FreeTimePage tests', () => {
    test('renders a heading', () => {
        render(<FreeTimePage />)

        expect(
            screen.getByRole('heading', { name: 'Free Time Calculator' })
        ).toBeInTheDocument()
    })

    test('renders a form with inputs', () => {
        render(<FreeTimePage />)

        expect(screen.getByRole('form', { name: '' })).toBeInTheDocument()

        expect(screen.getByLabelText('Age')).toBeInTheDocument()
        expect(screen.getByLabelText('Sleeping')).toBeInTheDocument()
        expect(screen.getByLabelText('Working')).toBeInTheDocument()
        expect(screen.getByLabelText('Commuting')).toBeInTheDocument()
        expect(screen.getByLabelText('Exercise')).toBeInTheDocument()
        expect(screen.getByLabelText('Eating/cooking')).toBeInTheDocument()
        expect(screen.getByLabelText('Chores')).toBeInTheDocument()
        expect(screen.getByLabelText('Grooming/hygiene')).toBeInTheDocument()
        expect(screen.getByLabelText('Parenting duties')).toBeInTheDocument()
        expect(screen.getByLabelText('Other')).toBeInTheDocument()

        expect(
            screen.getByRole('button', { name: 'Calculate Your Free Time' })
        ).toBeInTheDocument()
    })

    test('enter valid numbers and calculate free time button', async () => {
        const user = userEvent.setup()

        render(<FreeTimePage />)

        const inputElements = [
            screen.getByLabelText('Sleeping'),
            screen.getByLabelText('Working'),
            screen.getByLabelText('Commuting'),
            screen.getByLabelText('Exercise'),
            screen.getByLabelText('Eating/cooking'),
            screen.getByLabelText('Chores'),
            screen.getByLabelText('Grooming/hygiene'),
            screen.getByLabelText('Parenting duties'),
            screen.getByLabelText('Other'),
        ]

        for (let i = 0; i < inputElements.length; i++) {
            await user.clear(inputElements[i])
            await user.type(inputElements[i], '1')
        }

        await user.click(
            screen.getByRole('button', { name: /Calculate Your Free Time/i })
        )

        expect(
            screen.getByRole('heading', { name: 'Results' })
        ).toBeInTheDocument()

        expect(
            screen.getByText(/Free time hours per week: 159/i)
        ).toBeInTheDocument()

        expect(
            screen.getByText(/Free time hours per day: 22.714285714285715/i)
        ).toBeInTheDocument()
    })

    test('enter invalid numbers and calculate free time', async () => {
        const user = userEvent.setup()

        render(<FreeTimePage />)

        const inputElements = [
            screen.getByLabelText('Sleeping'),
            screen.getByLabelText('Working'),
            screen.getByLabelText('Commuting'),
            screen.getByLabelText('Exercise'),
            screen.getByLabelText('Eating/cooking'),
            screen.getByLabelText('Chores'),
            screen.getByLabelText('Grooming/hygiene'),
            screen.getByLabelText('Parenting duties'),
            screen.getByLabelText('Other'),
        ]

        for (let i = 0; i < inputElements.length; i++) {
            await user.clear(inputElements[i])
            await user.type(inputElements[i], '168')
        }

        await user.click(
            screen.getByRole('button', { name: /Calculate Your Free Time/i })
        )

        expect(
            screen.getByRole('heading', { name: 'Results' })
        ).toBeInTheDocument()

        expect(
            screen.getByText(/You have entered invalid numbers./i)
        ).toBeInTheDocument()
    })
})
