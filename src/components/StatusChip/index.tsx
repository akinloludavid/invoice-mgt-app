import React from 'react'
import { IStatus } from '../../utils/types'
import { useColorModeValue, Flex, Box, Text } from '@chakra-ui/react'

export const StatusChip = ({ status = 'paid' }: { status: IStatus }) => {
    const draftBg = useColorModeValue(
        'rgba(55,59,83,0.06)',
        'rgba(223,227,250,0.06)',
    )
    const pendingBg = useColorModeValue(
        'rgba(255,143,0,0.06)',
        'rgba(255, 143, 0,0.06)',
    )
    const pendingColor = useColorModeValue(
        'rgba(255,143,0)',
        'rgba(255, 143, 0)',
    )

    const draftColor = useColorModeValue('#373B53', '#DFE3FA')
    const paidBg = useColorModeValue(
        'rgba(51,214,159,0.06)',
        'rgba(51,214,159,0.06)',
    )
    const paidColor = useColorModeValue('rgba(51,214,159)', 'rgba(51,214,159)')

    if (status === 'pending') {
        return (
            <Flex
                bg={pendingBg}
                borderRadius='6px'
                align='center'
                justify={'center'}
                w={['104px']}
                h={['40px']}
                gap={['8px']}
            >
                <Box
                    w='8px'
                    h='8px'
                    borderRadius={'full'}
                    bgColor={pendingColor}
                ></Box>
                <Text
                    color={pendingColor}
                    zIndex='9999'
                    fontSize='12px'
                    fontWeight={'700'}
                    lineHeight='15px'
                >
                    Pending
                </Text>
            </Flex>
        )
    } else if (status === 'paid') {
        return (
            <Flex
                bg={paidBg}
                borderRadius='6px'
                align='center'
                justify={'center'}
                w={['104px']}
                h={['40px']}
                gap={['8px']}
            >
                <Box
                    w='8px'
                    h='8px'
                    borderRadius={'full'}
                    bgColor={paidColor}
                ></Box>
                <Text
                    color={paidColor}
                    fontSize='12px'
                    fontWeight={'700'}
                    lineHeight='15px'
                >
                    Paid
                </Text>
            </Flex>
        )
    } else {
        return (
            <Flex
                bgColor={draftBg}
                borderRadius='6px'
                align='center'
                justify={'center'}
                w={['104px']}
                h={['40px']}
                gap={['8px']}
            >
                <Box
                    w='8px'
                    h='8px'
                    borderRadius={'full'}
                    bgColor={draftColor}
                ></Box>
                <Text
                    opacity='1'
                    color={draftColor}
                    fontSize='12px'
                    fontWeight={'700'}
                    lineHeight='15px'
                >
                    Draft
                </Text>
            </Flex>
        )
    }
}
