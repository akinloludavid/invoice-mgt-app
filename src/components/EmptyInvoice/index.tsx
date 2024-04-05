import React from 'react'
import { Image, Box, Heading, Text, useColorModeValue } from '@chakra-ui/react'
const EmptyInvoice = () => {
    const boldTextColor = useColorModeValue('#0C0E16', '#ffffff')

    return (
        <Box maxW={['220px']}>
            <Image
                src={'/assets/illustration-empty.svg'}
                alt='empty invoice list'
            />
            <Heading
                variant={'h2'}
                as='h2'
                mt={['64px']}
                mb={['24px']}
                color={boldTextColor}
            >
                There is nothing here
            </Heading>
            <Text color={'#888EB0'} variant='body1'>
                Create an invoice by clicking the{' '}
                <Text
                    fontWeight={['700']}
                    color={useColorModeValue('#888EB0', '#DFE3FA')}
                >
                    New Invoice
                </Text>{' '}
                button and get started
            </Text>
        </Box>
    )
}

export default EmptyInvoice
