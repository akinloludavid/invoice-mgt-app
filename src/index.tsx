import { ChakraBaseProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { customTheme } from './stylesConfig/theme'
import '@fontsource/spartan/400.css'
import '@fontsource/spartan/500.css'
import '@fontsource/spartan/700.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <BrowserRouter>
        <ChakraBaseProvider theme={customTheme}>
            <App />
        </ChakraBaseProvider>
    </BrowserRouter>,
)
