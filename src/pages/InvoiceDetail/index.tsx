import React, { useState } from 'react'
import GoBack from '../../components/GoBack'
import DeleteModal from '../../components/Modals/DeleteModal'
import { StatusChip } from '../../components/StatusChip'
import useCustomMediaQuery from '../../customHooks/mediaQuery'
import {
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'
import { InvoiceType, IStatus } from '../../utils/types'
import { nanoid } from 'nanoid'
import { useNavigate, useParams } from 'react-router-dom'
import { getInvoiceById, markAsPaid } from '../../api'
import { useCustomToast } from '../../customHooks/notifications'
import { generatePDF } from '../../utils/helper'
const InvoiceDetails = () => {
    const navigate = useNavigate()
    const { successAlert } = useCustomToast()
    const { invoiceId: id = '' } = useParams()
    const invoice: InvoiceType = getInvoiceById(id)
    const [isOpen, setIsOpen] = useState(false)
    const { isMobile } = useCustomMediaQuery()

    const cardBgColor = useColorModeValue('#ffffff', '#1E2139')
    const boldTextColor = useColorModeValue('#0C0E16', '#ffffff')
    const handleDeleteModal = () => {
        setIsOpen(false)
    }

    const statusColor = useColorModeValue('#858BB2', '#DFE3FA')
    const lightTextColor = useColorModeValue(
        'lightMode.textColor',
        'darkMode.lightText',
    )

    const tableBgColor = useColorModeValue('#F9FAFE', '#252945')
    const amountBgColor = useColorModeValue('#373B53', '#0C0E16')
    const handleMarkAsPaid = async (invoice: InvoiceType) => {
        markAsPaid(invoice)
        successAlert(`Invoice marked as paid`)
        setTimeout(() => {
            navigate(`/`)
        }, 2000)
    }

    if (!invoice) {
        return (
            <Flex
                flexDirection='column'
                mx='auto'
                my='auto'
                h='100vh'
                justify={'center'}
                align='center'
            >
                <Heading>Error</Heading>
                <Text>Invoice Not Found</Text>
                <GoBack />
            </Flex>
        )
    }
    return (
        <>
            <Box pt={['126px', '126px', '126px', '72px', '72px']} pb={['54px']}>
                <DeleteModal
                    id={id}
                    isOpen={isOpen}
                    onClose={handleDeleteModal}
                />
                <GoBack />
                <Flex flexDirection={['column']} mt={['32px']} gap={['24px']}>
                    <Flex
                        align={['center']}
                        borderRadius={'8px'}
                        bgColor={cardBgColor}
                        h={['88px']}
                        justify={['space-between']}
                        px={['24px', '32px']}
                    >
                        <Flex
                            align={['center']}
                            justify={['space-between', 'flex-start']}
                            gap={['16px']}
                            w='100%'
                        >
                            <Text color={statusColor}>Status</Text>
                            <StatusChip
                                status={
                                    invoice?.status?.toLowerCase() as IStatus
                                }
                            />
                        </Flex>
                        <Flex
                            gap={['8px']}
                            align={['center']}
                            display={['none', 'flex']}
                        >
                            <Button
                                variant={'secondary'}
                                onClick={() =>
                                    navigate(`/edit/invoice/${invoice.id}`)
                                }
                            >
                                Edit
                            </Button>
                            <Button
                                variant='delete'
                                onClick={() => setIsOpen(true)}
                            >
                                Delete
                            </Button>
                            <Button
                                onClick={() =>
                                    generatePDF(`invoice-${invoice.id}`)
                                }
                            >
                                Download as pdf
                            </Button>
                            <Button
                                onClick={() => handleMarkAsPaid(invoice)}
                                _hover={{}}
                                _disabled={{
                                    bgColor: 'gray',
                                    cursor: 'not-allowed',
                                }}
                            >
                                Mark as Paid
                            </Button>
                        </Flex>
                    </Flex>
                    <Flex
                        bgColor={cardBgColor}
                        p={['24px', '32px', '48px']}
                        flexDirection={['column']}
                        borderRadius={'8px'}
                        id={`invoice-${invoice.id}`}
                    >
                        <Flex
                            justify={['space-between']}
                            flexDirection={['column', 'row']}
                            mb={['31px', '21px']}
                            gap={['30px']}
                        >
                            <Box>
                                <Text
                                    color={lightTextColor}
                                    variant={'body1'}
                                    fontWeight='700'
                                    mb='8px'
                                    fontSize={['16px']}
                                >
                                    <Text
                                        color='#7E88C3'
                                        fontSize={['16px']}
                                        as='span'
                                        fontWeight='700'
                                    >
                                        #
                                    </Text>
                                    {id}
                                </Text>
                                <Text color={statusColor}>
                                    {invoice?.description}
                                </Text>
                            </Box>
                            <Box
                                h={['75px']}
                                display='flex'
                                flexDirection={'column'}
                                gap='5px'
                            >
                                <Text
                                    color={statusColor}
                                    textAlign={['left', 'right']}
                                >
                                    {invoice?.senderAddress?.street}
                                </Text>
                                <Text
                                    color={statusColor}
                                    textAlign={['left', 'right']}
                                >
                                    {invoice?.senderAddress?.city}
                                </Text>
                                <Text
                                    color={statusColor}
                                    textAlign={['left', 'right']}
                                >
                                    {invoice?.senderAddress?.postCode}
                                </Text>
                                <Text
                                    color={statusColor}
                                    textAlign={['left', 'right']}
                                >
                                    {invoice?.senderAddress?.country}
                                </Text>
                            </Box>
                        </Flex>
                        <Grid
                            templateColumns={[
                                'repeat(1,1fr)',
                                'repeat(2,1fr)',
                                'repeat(3,1fr)',
                            ]}
                            gap={['32px', '41px', '100px']}
                            justifyContent='space-between'
                            flexWrap='wrap'
                        >
                            <Box>
                                <Text color={statusColor} mb={['12px']}>
                                    Invoice Date
                                </Text>
                                <Text color={boldTextColor} variant='bold'>
                                    {new Date(
                                        invoice?.createdAt,
                                    ).toDateString()}
                                </Text>
                                <Text
                                    color={statusColor}
                                    mt={['32px']}
                                    mb={['12px']}
                                >
                                    Payment Due
                                </Text>
                                <Text color={boldTextColor} variant='bold'>
                                    {invoice?.paymentDue}
                                </Text>
                            </Box>
                            <Box>
                                <Text color={statusColor} mb={['12px']}>
                                    Bill To
                                </Text>
                                <Text
                                    color={boldTextColor}
                                    variant='bold'
                                    mb={['8px']}
                                >
                                    {invoice?.clientName}
                                </Text>
                                <Box
                                    h={['75px']}
                                    display='flex'
                                    flexDirection={'column'}
                                    gap='5px'
                                >
                                    <Text
                                        color={statusColor}
                                        textAlign={'left'}
                                    >
                                        {invoice?.clientAddress?.street}
                                    </Text>
                                    <Text
                                        color={statusColor}
                                        textAlign={'left'}
                                    >
                                        {invoice?.clientAddress?.city}
                                    </Text>
                                    <Text
                                        color={statusColor}
                                        textAlign={'left'}
                                    >
                                        {invoice?.clientAddress?.postCode}
                                    </Text>
                                    <Text
                                        color={statusColor}
                                        textAlign={'left'}
                                    >
                                        {invoice?.clientAddress?.country}
                                    </Text>
                                </Box>
                            </Box>
                            <Box>
                                <Text color={statusColor} mb={['12px']}>
                                    Payment Details
                                </Text>
                                <Text
                                    color={boldTextColor}
                                    variant='bold'
                                    mb={['8px']}
                                >
                                    {invoice?.paymentDetails?.accountName}
                                </Text>
                                <Box
                                    h={['75px']}
                                    display='flex'
                                    flexDirection={'column'}
                                    gap='5px'
                                >
                                    <Text
                                        color={statusColor}
                                        textAlign={'left'}
                                    >
                                        {
                                            invoice?.paymentDetails
                                                ?.bankAccountNumber
                                        }
                                    </Text>
                                    <Text
                                        color={statusColor}
                                        textAlign={'left'}
                                    >
                                        {invoice?.paymentDetails?.bankName}
                                    </Text>
                                </Box>
                            </Box>
                            <Box>
                                <Text color={statusColor} mb={['12px']}>
                                    Sent To
                                </Text>
                                <Text color={boldTextColor} variant={'bold'}>
                                    {invoice?.clientEmail || 'N/A'}
                                </Text>
                            </Box>
                        </Grid>
                        <Box
                            bgColor={tableBgColor}
                            mt={['45px']}
                            p={['32px']}
                            borderRadius='8px 8px 0px 0px'
                        >
                            <Grid
                                display={['none', 'grid']}
                                templateColumns={['repeat(6,1fr)']}
                                mb={['32px']}
                            >
                                <GridItem colSpan={[3]}>
                                    <Text color={statusColor} variant='body2'>
                                        Item Name
                                    </Text>
                                </GridItem>
                                <GridItem colSpan={1}>
                                    <Text
                                        color={statusColor}
                                        variant='body2'
                                        textAlign='center'
                                    >
                                        QTY.
                                    </Text>
                                </GridItem>
                                <GridItem colSpan={1}>
                                    <Text
                                        variant='body2'
                                        color={statusColor}
                                        textAlign='right'
                                    >
                                        Price
                                    </Text>
                                </GridItem>
                                <GridItem colSpan={1}>
                                    <Text
                                        color={statusColor}
                                        variant='body2'
                                        textAlign='right'
                                    >
                                        Total
                                    </Text>
                                </GridItem>
                            </Grid>
                            <Flex
                                display={['flex', 'none']}
                                gap='24px'
                                flexDirection={['column']}
                            >
                                {invoice?.items?.map((item: any) => (
                                    <Flex
                                        key={nanoid()}
                                        align='center'
                                        justify={'space-between'}
                                    >
                                        <Box>
                                            <Text
                                                color={boldTextColor}
                                                variant='body1'
                                                fontWeight={'700'}
                                                mb='8px'
                                            >
                                                {item.name}
                                            </Text>
                                            <Text
                                                color={statusColor}
                                                variant='body1'
                                                fontWeight={'700'}
                                            >
                                                {item.quantity} x {item.price}
                                            </Text>
                                        </Box>
                                        <Box>
                                            <Text
                                                color={boldTextColor}
                                                variant='body1'
                                                fontWeight={'700'}
                                                textAlign='right'
                                            >
                                                £{item.total.toLocaleString()}
                                            </Text>
                                        </Box>
                                    </Flex>
                                ))}
                            </Flex>

                            {invoice?.items?.map((item: any) => (
                                <>
                                    {!isMobile && (
                                        <Grid
                                            key={nanoid()}
                                            mb={['32px']}
                                            templateColumns={['repeat(6,1fr)']}
                                        >
                                            <GridItem colSpan={[3]}>
                                                <Text
                                                    color={boldTextColor}
                                                    variant='body1'
                                                    fontWeight={'700'}
                                                >
                                                    {item.name}
                                                </Text>
                                            </GridItem>
                                            <GridItem colSpan={1}>
                                                <Text
                                                    color={statusColor}
                                                    variant='body1'
                                                    fontWeight={'700'}
                                                    textAlign='center'
                                                >
                                                    {item.quantity}
                                                </Text>
                                            </GridItem>
                                            <GridItem colSpan={1}>
                                                <Text
                                                    color={statusColor}
                                                    variant='body1'
                                                    fontWeight={'700'}
                                                    textAlign='right'
                                                >
                                                    £{item.price}
                                                </Text>
                                            </GridItem>
                                            <GridItem colSpan={1}>
                                                <Text
                                                    color={boldTextColor}
                                                    variant='body1'
                                                    fontWeight={'700'}
                                                    textAlign='right'
                                                >
                                                    £
                                                    {item.total.toLocaleString()}
                                                </Text>
                                            </GridItem>
                                        </Grid>
                                    )}
                                </>
                            ))}
                        </Box>
                        <Flex
                            bgColor={amountBgColor}
                            justify={['space-between']}
                            align='center'
                            px={['32px']}
                            py={['24px']}
                            borderRadius='0 0 8px 8px'
                        >
                            <Text variant='body1' color='white'>
                                Amount Due
                            </Text>
                            <Text
                                fontSize={'24px'}
                                fontWeight='700'
                                lineHeight={'32px'}
                                color='#fff'
                            >
                                £{invoice?.total?.toLocaleString()}
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>
            <Flex
                p='24px'
                gap={['8px']}
                justify='space-between'
                align={['center']}
                display={['flex', 'none']}
                bgColor={cardBgColor}
                w='100vw'
                ml='-24px'
            >
                <Button
                    variant={'secondary'}
                    onClick={() => navigate(`/edit/invoice/${invoice.id}`)}
                >
                    Edit
                </Button>
                <Button variant='delete' onClick={() => setIsOpen(true)}>
                    Delete
                </Button>
                <Button
                    _hover={{}}
                    _disabled={{
                        bgColor: 'gray',
                        cursor: 'not-allowed',
                    }}
                    onClick={() => handleMarkAsPaid(invoice)}
                >
                    Mark as Paid
                </Button>
            </Flex>
        </>
    )
}

export default InvoiceDetails
