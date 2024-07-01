// https://testing-library.com/docs/react-testing-library/example-intro

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '../app/page'

describe('HomePage', () => {
    it('renders a heading', () => {
        // Arrange
        render(<Home />)
        // Action
        const heading = screen.getByRole('heading', { level: 1 })
        // Assertion
        expect(heading).toBeInTheDocument()
    });


})