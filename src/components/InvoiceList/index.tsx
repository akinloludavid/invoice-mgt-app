import React from 'react'
import {
    Flex,
    Grid,
    GridItem,
    Icon,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'
import { BiChevronRight } from 'react-icons/bi'
import { StatusChip } from '../StatusChip'
import useCustomMediaQuery from '../../customHooks/mediaQuery'
import { useNavigate } from 'react-router-dom'

const InvoiceListComp = (props: any) => {
    const { id, paymentDue: date, clientName, total, status } = props
    const navigate = useNavigate()
    const { isMobile } = useCustomMediaQuery()
    const lightTextColor = useColorModeValue(
        'lightMode.textColor',
        'darkMode.lightText',
    )
    const boldTextColor = useColorModeValue('#0C0E16', '#ffffff')
    const listBgColor = useColorModeValue(
        'lightMode.white',
        'darkMode.darkBlue',
    )
    const dateTextColor = useColorModeValue('#888EB0', '#DFE3FA')
    const clientNameTextColor = useColorModeValue('#858BB2', '#FFFFFF')
    return (
        <>
            {isMobile ? (
                <Grid
                    w={['100%']}
                    borderRadius={'8px'}
                    h={['134px', '72px']}
                    py={['16px']}
                    px={['24px']}
                    alignItems='center'
                    bgColor={listBgColor}
                    cursor='pointer'
                    boxShadow='0px 10px 10px -10px rgba(72, 84, 159, 0.100397)'
                    templateColumns={['repeat(4,1fr)']}
                    onClick={() => navigate(`/invoice/${id}`)}
                >
                    <GridItem colSpan={2}>
                        <Text
                            color={lightTextColor}
                            variant={'body1'}
                            fontWeight='700'
                        >
                            <Text
                                color='#7E88C3'
                                as='span'
                                fontSize={'12px'}
                                fontWeight='700'
                            >
                                #
                            </Text>
                            {id}
                        </Text>
                    </GridItem>
                    <GridItem
                        colSpan={2}
                        colStart={[1, null]}
                        rowStart={[2, 0]}
                        mb='-36px'
                    >
                        <Text variant={'body1'} color={dateTextColor}>
                            {new Date(date).toDateString().substring(4)}
                        </Text>
                    </GridItem>
                    <GridItem colSpan={2} colStart={[3, 0]} rowStart={[1, 0]}>
                        <Text
                            textAlign={['right']}
                            variant={'body1'}
                            color={clientNameTextColor}
                        >
                            {clientName}
                        </Text>
                    </GridItem>
                    <GridItem colSpan={2} colStart={[1, 0]} mt={'12px'}>
                        <Text
                            fontSize='16px'
                            fontWeight={['700']}
                            variant={'body1'}
                            color={boldTextColor}
                        >
                            £{total}
                        </Text>
                    </GridItem>
                    <GridItem colSpan={2} colStart={[3, 0]}>
                        <Flex
                            justify={['flex-end', 'space-between']}
                            my='auto'
                            align='center'
                        >
                            <StatusChip status={status} />
                            <Icon
                                display={['none', 'flex']}
                                color='#7C5DFA'
                                as={BiChevronRight}
                                strokeWidth='2'
                            />
                        </Flex>
                    </GridItem>
                </Grid>
            ) : (
                <Grid
                    w={['100%']}
                    borderRadius={'8px'}
                    h={['134px', '72px']}
                    py={['16px']}
                    px={['24px', '24px', '32px']}
                    alignItems='center'
                    bgColor={listBgColor}
                    cursor='pointer'
                    boxShadow='0px 10px 10px -10px rgba(72, 84, 159, 0.100397)'
                    templateColumns={['repeat(4,1fr)', 'repeat(10,1fr)']}
                    onClick={() => navigate(`/invoice/${id}`)}
                >
                    <GridItem colSpan={2}>
                        <Text
                            color={lightTextColor}
                            variant={'body1'}
                            fontWeight='700'
                        >
                            <Text
                                color='#7E88C3'
                                as='span'
                                fontSize={'12px'}
                                fontWeight='700'
                            >
                                #
                            </Text>
                            {id}
                        </Text>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <Text variant={'body1'} color={dateTextColor}>
                            Due {new Date(date).toDateString().substring(4)}
                        </Text>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <Text variant={'body1'} color={clientNameTextColor}>
                            {clientName}
                        </Text>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <Text
                            fontSize='16px'
                            fontWeight={['700']}
                            variant={'body1'}
                            color={boldTextColor}
                        >
                            £{total}
                        </Text>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <Flex
                            justify={['flex-end', 'space-between']}
                            my='auto'
                            align='center'
                        >
                            <StatusChip status={status} />
                            <Icon
                                display={['none', 'flex']}
                                color='#7C5DFA'
                                as={BiChevronRight}
                                strokeWidth='2'
                            />
                        </Flex>
                    </GridItem>
                </Grid>
            )}
        </>
    )
}

export default InvoiceListComp
