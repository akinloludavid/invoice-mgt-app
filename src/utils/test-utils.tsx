import * as React from 'react'
// import { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { ChakraBaseProvider } from '@chakra-ui/react'
import { customTheme } from '../stylesConfig/theme'
import { BrowserRouter } from 'react-router-dom'

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <BrowserRouter>
            <ChakraBaseProvider theme={customTheme}>
                {children}
            </ChakraBaseProvider>
        </BrowserRouter>
    )
}

const customRender = (ui: any, options?: Omit<RenderOptions, 'wrapper'>) =>
    render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
