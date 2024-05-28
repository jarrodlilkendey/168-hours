import { render, screen } from '@testing-library/react'
import { mockTools } from '@/__mocks__/mockData'

import Home from '../../../pages/index'

describe('Home Page tests', () => {
    test('renders a heading', async () => {
        render(<Home />)

        expect(
            screen.getByRole('heading', { name: '168 Hours' })
        ).toBeInTheDocument()
    })

    // test('shows all tools from the mocked API response', async () => {
    //     render(<Home />)

    //     mockTools.map((tool) => {
    //         expect(screen.getByTestId(tool.testId)).toBeInTheDocument()
    //     })
    // })
})
