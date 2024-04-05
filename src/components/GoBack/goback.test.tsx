import * as React from 'react'
import '@testing-library/jest-dom'

import GoBack from '.'
import { render, screen } from '../../utils/test-utils'

test('loads goback component', () => {
    // ARRANGE
    render(<GoBack />)
    const button = screen.getByTestId('go-back')
    expect(button).toHaveTextContent('Go Back')
    // fireEvent.click(button)
    // expect(navigate).toHaveBeenCalled()
})
