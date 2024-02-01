import { render, screen } from '@testing-library/react'

import FreeTimePage from '../../../pages/freetime'

describe('FreeTimePage tests', () => {
    test('renders a heading', () => {
        render(<FreeTimePage />)

        expect(
            screen.getByRole('heading', { name: 'Free Time Calculator' })
        ).toBeInTheDocument()
    })
})
