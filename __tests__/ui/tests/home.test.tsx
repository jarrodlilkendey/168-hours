import { render, screen } from '@testing-library/react'

import Home from '../../../pages/index'

describe('Home Page tests', () => {
    test('renders a heading', () => {
        render(<Home />)

        expect(
            screen.getByRole('heading', { name: 'Mafia Wars Home' })
        ).toBeInTheDocument()
    })
})
