import { extendTheme } from '@chakra-ui/react'
import { ButtonStyles as Button } from './customComponents/Button'
import { TextStyle as Text } from './customComponents/Text'
import { HeadingStyle as Heading } from './customComponents/Heading'
import { InputStyles as Input } from './customComponents/Input'
import { FormLabelStyles as FormLabel } from './customComponents/FormLabel'

import { lightModeColors, darkModeColors } from './customComponents/colors'
const components = {
    Button,
    Text,
    Heading,
    Input,
    FormLabel,
}
export const customTheme = extendTheme({
    fonts: {
        heading: 'Spartan, sans-serif',
        body: 'Spartan, sans-serif',
    },
    components,
    colors: {
        lightMode: lightModeColors,
        darkMode: darkModeColors,
        error: '#EC5757',
    },
})
