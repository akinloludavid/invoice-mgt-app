import React from 'react'
import {
    Box,
    Icon,
    Image,
    useColorMode,
    useColorModeValue,
} from '@chakra-ui/react'
import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const SideBar = () => {
    const navigate = useNavigate()
    const colorModeIcon = useColorModeValue(MdLightMode, MdDarkMode)
    const { toggleColorMode } = useColorMode()
    const handleToggleColorMode = () => {
        toggleColorMode()
    }
    return (
        <Box
            bgColor={'#373B53'}
            h={['80px', '80px', '80px', '100vh', '100vh']}
            w={['100%', '100%', '100vw', '103px', '103px']}
            left='0'
            top='0'
            position={'fixed'}
            sx={{
                '@media screen and (min-width: 1441px)': {
                    position: 'absolute',
                },
            }}
            borderRadius={[
                '0px',
                '0px',
                '0px',
                '0px 20px 20px 0px',
                '0px 20px 20px 0px',
            ]}
            zIndex='99999'
            pb={['24px']}
            display='flex'
            alignItems={['center']}
            justifyContent={['space-between', 'space-between']}
            flexDirection={['row', 'row', 'row', 'column', 'column']}
        >
            <Box
                bgColor='#7C5DFA'
                w={['80px', '80px', '80px', '103px', '103px']}
                h={['80px', '80px', '80px', '103px', '103px']}
                mt={['24px', '24px', '24px', 0]}
                borderRadius={['0px 20px 20px 0px', '0px 20px 20px 0px']}
                display={'grid'}
                placeItems='center'
            >
                <Image
                    zIndex={'999'}
                    w={['40px']}
                    src={'/assets/logo.svg'}
                    alt='invoice app logo'
                    onClick={() => navigate('/')}
                    cursor={'pointer'}
                />
            </Box>
            <Box
                mt={['64px', '64px', '64px', '-51.5px', '-51.5px']}
                mb='0px'
                // display="none"
                ml='0px'
                position={['fixed', 'fixed', 'fixed', 'relative']}
                h={['40px', '40px', '40px', '51.5px', '51.5px']}
                w={['80px', '80px', '80px', '103px', '103px']}
                bgColor='#9277FF'
                borderRadius='20px 0px 20px 0px'
            />

            <Box
                mt={['auto']}
                // mx={[0, 0, 0, "auto"]}
                mr={['32px', '32px', '32px', '0']}
                display={['flex']}
                flexDirection={['row', 'row', 'row', 'column', 'column']}
                justifyContent='center'
                alignItems='center'
                gap={['64px', '64px', '64px', '48px']}
            >
                <Icon
                    onClick={handleToggleColorMode}
                    as={colorModeIcon}
                    color='#7E88C3'
                    fontSize={'20px'}
                    cursor={'pointer'}
                />
                <Image
                    src={'/assets/image-avatar.jpg'}
                    alt='user icon'
                    w={['40px']}
                    h={['40px']}
                    borderRadius={'full'}
                />
            </Box>
        </Box>
    )
}

export default SideBar
