import * as React from 'react'
import '@testing-library/jest-dom'
import CreateInvoice from '.'
import { render, screen } from '../../utils/test-utils'

test('loads create invoice form', () => {
    // ARRANGE
    render(<CreateInvoice />)

    const heading = screen.getByTestId('create-invoice-heading')
    const submitButton = screen.getByTestId('save-new-invoice')

    expect(heading).toHaveTextContent('New Invoice')
    expect(submitButton).toHaveTextContent('Save')
    expect(submitButton).toHaveAttribute('type', 'submit')
})
