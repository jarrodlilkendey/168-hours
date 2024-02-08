import { render, screen } from '@testing-library/react'

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
})
