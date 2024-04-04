import { Box, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { IChildren } from '../../utils/types'
import SideBar from '../Sidebar'

const PageLayout = ({ children }: IChildren) => {
    const mainBgColor = useColorModeValue(
        'lightMode.mainBgColor',
        'darkMode.mainBgColor',
    )
    return (
        <Box
            bgColor={mainBgColor}
            px={['24px', '24px', '48px', '120px', '355px']}
            minH='100vh'
            // minW='100vw'
            mx={'auto'}
            maxW={'1440px'}
            position='relative'
        >
            <SideBar />
            <Box>{children}</Box>
        </Box>
    )
}

export default PageLayout
