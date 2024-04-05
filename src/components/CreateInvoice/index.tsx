import React, { ChangeEvent, useState } from 'react'
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Heading,
    Icon,
    Input,
    Select,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'
import { FaPlus, FaTrash } from 'react-icons/fa'
import { ErrorMessage, Formik } from 'formik'
import * as Yup from 'yup'
import { IFormList, InvoiceType } from '../../utils/types'
import { MdChevronLeft } from 'react-icons/md'
import { paymentTerms } from '../../utils/data'
import { createInvoice } from '../../api'
import { useNavigate } from 'react-router-dom'
import { useCustomToast } from '../../customHooks/notifications'

const CreateInvoice = () => {
    const navigate = useNavigate()
    const btnBgColor = useColorModeValue('#F9FAFE', '#252945')
    const btnColor = useColorModeValue('#7E88C3', '#DFE3FA')
    const boldTextColor = useColorModeValue('#0C0E16', '#ffffff')
    const formBgColor = useColorModeValue('#ffffff', '#141625')
    const statusColor = useColorModeValue('#858BB2', '#DFE3FA')
    const placeHolderColor = useColorModeValue('#0C0E1640', '#ffffff')
    const borderColor = useColorModeValue(
        '1px solid #DFE3FA',
        '1px solid #252945',
    )

    const { successAlert } = useCustomToast()
    const errorBorder = '1px solid #EC5757'
    const [formArray, setFormArray] = useState<IFormList[]>([])

    const initialValues = {
        billFromStreetAddress: '',
        billFromCity: '',
        billFromPostCode: '',
        billFromCountry: '',
        billToStreetAddress: '',
        billToCity: '',
        billToPostCode: '',
        billToCountry: '',
        clientName: '',
        clientEmail: '',
        invoiceDate: '',
        paymentTerms: '',
        projectDescription: '',
        bankName: '',
        bankAccountNumber: '',
        accountName: '',
    }
    const validationSchema = Yup.object().shape({
        clientName: Yup.string().required("can't be empty"),
        clientEmail: Yup.string().email().required("can't be empty"),
        invoiceDate: Yup.string().required("can't be empty"),
        paymentTerms: Yup.string().required("can't be empty"),
        projectDescription: Yup.string().required("can't be empty"),
        billFromStreetAddress: Yup.string().required("can't be empty"),
        billFromCity: Yup.string().required("can't be empty"),
        billFromPostCode: Yup.string().required("can't be empty"),
        billFromCountry: Yup.string().required("can't be empty"),
        billToStreetAddress: Yup.string().required("can't be empty"),
        billToCity: Yup.string().required("can't be empty"),
        billToPostCode: Yup.string().required("can't be empty"),
        billToCountry: Yup.string().required("can't be empty"),
        bankName: Yup.string().required("can't be empty"),
        bankAccountNumber: Yup.string().required("can't be empty"),
        accountName: Yup.string().required("can't be empty"),
    })
    const handleSubmit = async (values: any) => {
        const formValues: InvoiceType = {
            senderAddress: {
                street: values.billFromStreetAddress,
                city: values.billFromCity,
                postCode: values.billFromPostCode,
                country: values.billFromCountry,
            },
            clientAddress: {
                street: values.billToStreetAddress,
                city: values.billToCity,
                postCode: values.billToPostCode,
                country: values.billToCountry,
            },
            paymentDetails: {
                bankAccountNumber: values.bankAccountNumber,
                bankName: values.bankName,
                accountName: values.accountName,
            },
            clientName: values.clientName,
            clientEmail: values.clientEmail,
            description: values.projectDescription,
            paymentTerms: values.paymentTerms,
            paymentDue: values.invoiceDate,
            items: formArray,
            total: formArray.reduce((acc, curr) => acc + Number(curr.total), 0),
            status: 'pending',
            createdAt: new Date().toLocaleDateString(),
        }
        createInvoice(formValues)
        successAlert('Created invoice successfully')
        setTimeout(() => {
            navigate(`/`)
        }, 2000)
    }
    const addToFormList = () => {
        setFormArray(prev => [
            ...prev,
            { name: '', quantity: '', price: 0, total: 0 },
        ])
    }
    const removeFromList = (idx: number) => {
        const newFormList = formArray.filter((_, index) => idx !== index)
        setFormArray(newFormList)
    }
    const handleFormArrayChange = (
        e: ChangeEvent<HTMLInputElement>,
        index: number,
    ) => {
        const currentInputName = e.target.name
        const newFormArray = formArray
            .map((el, idx) => {
                if (idx === index) {
                  if (
                      currentInputName === 'quantity' ||
                      currentInputName === 'price'
                  ) {
                      return {
                          ...el,
                          [currentInputName]: isNaN(Number(e.target.value))
                              ? ''
                              : e.target.value,
                      }
                  }
                    return {
                        ...el,
                        [currentInputName]: e.target.value,
                    }
                } else {
                    return el
                }
            })
            .map(el => ({ ...el, total: +el.price * +el.quantity }))

        setFormArray(newFormArray)
    }

    return (
        <Box w={['100%']} h={['full']} bgColor='#00000030'>
            <Box
                w={['100%']}
                px={['0', '56px']}
                pt={['80px', '80px', '80px', '0']}
                outline='none'
                overflowY='scroll'
                bgColor={formBgColor}
            >
                <Button
                    mt={['32px']}
                    fontSize={'12px'}
                    fontWeight='700'
                    variant={'link'}
                    color={boldTextColor}
                    opacity={1}
                    bgColor='transparent'
                    leftIcon={<MdChevronLeft color='#7C5DFA' />}
                    w='fit-content'
                    onClick={() => navigate(-1)}
                    gap='16px'
                    display={['flex']}
                >
                    Go Back
                </Button>
                <Heading
                    fontSize={['24px']}
                    fontWeight='700'
                    lineHeight={'32px'}
                    color={boldTextColor}
                    mb={['48px']}
                    mt={['24px']}
                    as='h2'
                    data-testid='create-invoice-heading'
                >
                    New Invoice
                </Heading>
                <Box maxW='100%'>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                    >
                        {({
                            handleSubmit,
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Heading
                                    variant={'h4'}
                                    as='h4'
                                    color='#7C5DFA'
                                    mb='24px'
                                >
                                    Bill From
                                </Heading>
                                <Grid
                                    templateColumns={[
                                        'repeat(2,1fr)',
                                        'repeat(3,1fr)',
                                    ]}
                                    mb={['48px']}
                                    gap={['24px']}
                                    w={['100%']}
                                >
                                    <GridItem colSpan={[2, 3]}>
                                        <FormControl>
                                            <Flex justify={'space-between'}>
                                                <FormLabel
                                                    color={
                                                        touched.billFromStreetAddress &&
                                                        errors.billFromStreetAddress
                                                            ? 'error'
                                                            : statusColor
                                                    }
                                                >
                                                    Street Address
                                                </FormLabel>
                                                {touched.billFromStreetAddress &&
                                                errors.billFromStreetAddress ? (
                                                    <ErrorMessage
                                                        name='billFromStreetAddress'
                                                        render={msg => (
                                                            <Text color='error'>
                                                                {msg}
                                                            </Text>
                                                        )}
                                                    />
                                                ) : null}
                                            </Flex>
                                            <Input
                                                border={
                                                    touched.billFromStreetAddress &&
                                                    errors.billFromStreetAddress
                                                        ? errorBorder
                                                        : borderColor
                                                }
                                                color={boldTextColor}
                                                _placeholder={{
                                                    color: placeHolderColor,
                                                }}
                                                w={['100%']}
                                                name='billFromStreetAddress'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={
                                                    values.billFromStreetAddress
                                                }
                                            />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={1}>
                                        <FormControl>
                                            <Flex justify={'space-between'}>
                                                <FormLabel
                                                    color={
                                                        touched.billFromCity &&
                                                        errors.billFromCity
                                                            ? 'error'
                                                            : statusColor
                                                    }
                                                >
                                                    City
                                                </FormLabel>
                                                {touched.billFromCity &&
                                                    errors.billFromCity && (
                                                        <ErrorMessage
                                                            name='billFromCity'
                                                            render={msg => (
                                                                <Text color='error'>
                                                                    {msg}
                                                                </Text>
                                                            )}
                                                        />
                                                    )}
                                            </Flex>
                                            <Input
                                                color={boldTextColor}
                                                _placeholder={{
                                                    color: placeHolderColor,
                                                }}
                                                border={
                                                    touched.billFromCity &&
                                                    errors.billFromCity
                                                        ? errorBorder
                                                        : borderColor
                                                }
                                                w={['100%']}
                                                name='billFromCity'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.billFromCity}
                                            />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={1}>
                                        <FormControl>
                                            <Flex justify={'space-between'}>
                                                <FormLabel
                                                    color={
                                                        touched.billFromPostCode &&
                                                        errors.billFromPostCode
                                                            ? 'error'
                                                            : statusColor
                                                    }
                                                >
                                                    Post Code
                                                </FormLabel>
                                                {touched.billFromPostCode &&
                                                    errors.billFromPostCode && (
                                                        <ErrorMessage
                                                            name='billFromPostCode'
                                                            render={msg => (
                                                                <Text color='error'>
                                                                    {msg}
                                                                </Text>
                                                            )}
                                                        />
                                                    )}
                                            </Flex>
                                            <Input
                                                color={boldTextColor}
                                                _placeholder={{
                                                    color: placeHolderColor,
                                                }}
                                                border={
                                                    touched.billFromPostCode &&
                                                    errors.billFromPostCode
                                                        ? errorBorder
                                                        : borderColor
                                                }
                                                w={['100%']}
                                                name='billFromPostCode'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.billFromPostCode}
                                            />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={1}>
                                        <FormControl>
                                            <Flex justify={'space-between'}>
                                                <FormLabel
                                                    color={
                                                        touched.billFromCountry &&
                                                        errors.billFromCountry
                                                            ? 'error'
                                                            : statusColor
                                                    }
                                                >
                                                    Country
                                                </FormLabel>
                                                {touched.billFromCountry &&
                                                    errors.billFromCountry && (
                                                        <ErrorMessage
                                                            name='billFromCountry'
                                                            render={msg => (
                                                                <Text color='error'>
                                                                    {msg}
                                                                </Text>
                                                            )}
                                                        />
                                                    )}
                                            </Flex>
                                            <Input
                                                color={boldTextColor}
                                                _placeholder={{
                                                    color: placeHolderColor,
                                                }}
                                                border={
                                                    touched.billFromCountry &&
                                                    errors.billFromCountry
                                                        ? errorBorder
                                                        : borderColor
                                                }
                                                w={['100%']}
                                                name='billFromCountry'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.billFromCountry}
                                            />
                                        </FormControl>
                                    </GridItem>
                                </Grid>
                                <Heading
                                    variant={'h4'}
                                    as='h4'
                                    color='#7C5DFA'
                                    mb='24px'
                                >
                                    Payment Details
                                </Heading>
                                <Grid
                                    templateColumns={['repeat(2,1fr)']}
                                    mb={['48px']}
                                    gap={['24px']}
                                    w={['100%']}
                                >
                                    <GridItem colSpan={2}>
                                        <FormControl>
                                            <Flex justify={'space-between'}>
                                                <FormLabel
                                                    color={
                                                        touched.accountName &&
                                                        errors.accountName
                                                            ? 'error'
                                                            : statusColor
                                                    }
                                                >
                                                    Account Name
                                                </FormLabel>
                                                {touched.accountName &&
                                                errors.accountName ? (
                                                    <ErrorMessage
                                                        name='accountName'
                                                        render={msg => (
                                                            <Text color='error'>
                                                                {msg}
                                                            </Text>
                                                        )}
                                                    />
                                                ) : null}
                                            </Flex>
                                            <Input
                                                border={
                                                    touched.accountName &&
                                                    errors.accountName
                                                        ? errorBorder
                                                        : borderColor
                                                }
                                                color={boldTextColor}
                                                _placeholder={{
                                                    color: placeHolderColor,
                                                }}
                                                w={['100%']}
                                                name='accountName'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.accountName}
                                            />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={1}>
                                        <FormControl>
                                            <Flex justify={'space-between'}>
                                                <FormLabel
                                                    color={
                                                        touched.bankName &&
                                                        errors.bankName
                                                            ? 'error'
                                                            : statusColor
                                                    }
                                                >
                                                    Bank Name
                                                </FormLabel>
                                                {touched.bankName &&
                                                    errors.bankName && (
                                                        <ErrorMessage
                                                            name='bankName'
                                                            render={msg => (
                                                                <Text color='error'>
                                                                    {msg}
                                                                </Text>
                                                            )}
                                                        />
                                                    )}
                                            </Flex>
                                            <Input
                                                color={boldTextColor}
                                                _placeholder={{
                                                    color: placeHolderColor,
                                                }}
                                                border={
                                                    touched.bankName &&
                                                    errors.bankName
                                                        ? errorBorder
                                                        : borderColor
                                                }
                                                w={['100%']}
                                                name='bankName'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.bankName}
                                            />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={1}>
                                        <FormControl>
                                            <Flex justify={'space-between'}>
                                                <FormLabel
                                                    color={
                                                        touched.bankAccountNumber &&
                                                        errors.bankAccountNumber
                                                            ? 'error'
                                                            : statusColor
                                                    }
                                                >
                                                    Account Number
                                                </FormLabel>
                                                {touched.bankAccountNumber &&
                                                    errors.bankAccountNumber && (
                                                        <ErrorMessage
                                                            name='bankAccountNumber'
                                                            render={msg => (
                                                                <Text color='error'>
                                                                    {msg}
                                                                </Text>
                                                            )}
                                                        />
                                                    )}
                                            </Flex>
                                            <Input
                                                color={boldTextColor}
                                                _placeholder={{
                                                    color: placeHolderColor,
                                                }}
                                                border={
                                                    touched.bankAccountNumber &&
                                                    errors.bankAccountNumber
                                                        ? errorBorder
                                                        : borderColor
                                                }
                                                w={['100%']}
                                                name='bankAccountNumber'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.bankAccountNumber}
                                            />
                                        </FormControl>
                                    </GridItem>
                                </Grid>
                                <Heading
                                    variant={'h4'}
                                    as='h4'
                                    color='#7C5DFA'
                                    mt={['48px']}
                                    mb='24px'
                                >
                                    Bill To
                                </Heading>
                                <FormControl mb={['24px']}>
                                    <Flex justify={'space-between'}>
                                        <FormLabel
                                            color={
                                                touched.clientName &&
                                                errors.clientName
                                                    ? 'error'
                                                    : statusColor
                                            }
                                        >
                                            {`Client's Name`}
                                        </FormLabel>
                                        {touched.clientName &&
                                            errors.clientName && (
                                                <ErrorMessage
                                                    name='clientName'
                                                    render={msg => (
                                                        <Text color='error'>
                                                            {msg}
                                                        </Text>
                                                    )}
                                                />
                                            )}
                                    </Flex>
                                    <Input
                                        color={boldTextColor}
                                        _placeholder={{
                                            color: placeHolderColor,
                                        }}
                                        border={
                                            touched.clientName &&
                                            errors.clientName
                                                ? errorBorder
                                                : borderColor
                                        }
                                        w={['100%']}
                                        name='clientName'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.clientName}
                                    />
                                </FormControl>
                                <FormControl mb={['24px']}>
                                    <Flex justify={'space-between'}>
                                        <FormLabel
                                            color={
                                                touched.clientEmail &&
                                                errors.clientEmail
                                                    ? 'error'
                                                    : statusColor
                                            }
                                        >
                                            {`Client's Email`}
                                        </FormLabel>
                                        {touched.clientEmail &&
                                            errors.clientEmail && (
                                                <ErrorMessage
                                                    name='clientEmail'
                                                    render={msg => (
                                                        <Text color='error'>
                                                            {msg}
                                                        </Text>
                                                    )}
                                                />
                                            )}
                                    </Flex>
                                    <Input
                                        color={boldTextColor}
                                        _placeholder={{
                                            color: placeHolderColor,
                                        }}
                                        border={
                                            touched.clientEmail &&
                                            errors.clientEmail
                                                ? errorBorder
                                                : borderColor
                                        }
                                        placeholder='e.g. email@example.com'
                                        w={['100%']}
                                        name='clientEmail'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.clientEmail}
                                    />
                                </FormControl>
                                <FormControl mb={['24px']}>
                                    <Flex justify={'space-between'}>
                                        <FormLabel
                                            color={
                                                touched.billToStreetAddress &&
                                                errors.billToStreetAddress
                                                    ? 'error'
                                                    : statusColor
                                            }
                                        >
                                            Street Address
                                        </FormLabel>
                                        {touched.billToStreetAddress &&
                                            errors.billToStreetAddress && (
                                                <ErrorMessage
                                                    name='billToStreetAddress'
                                                    render={msg => (
                                                        <Text color='error'>
                                                            {msg}
                                                        </Text>
                                                    )}
                                                />
                                            )}
                                    </Flex>
                                    <Input
                                        color={boldTextColor}
                                        _placeholder={{
                                            color: placeHolderColor,
                                        }}
                                        border={
                                            touched.billToStreetAddress &&
                                            errors.billToStreetAddress
                                                ? errorBorder
                                                : borderColor
                                        }
                                        w={['100%']}
                                        name='billToStreetAddress'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.billToStreetAddress}
                                    />
                                </FormControl>
                                <Grid
                                    templateColumns={[
                                        'repeat(2,1fr)',
                                        'repeat(3,1fr)',
                                    ]}
                                    mb={['48px']}
                                    gap={['24px']}
                                    w={['100%']}
                                >
                                    <GridItem colSpan={1}>
                                        <FormControl>
                                            <Flex justify={'space-between'}>
                                                <FormLabel
                                                    color={
                                                        touched.billToCity &&
                                                        errors.billToCity
                                                            ? 'error'
                                                            : statusColor
                                                    }
                                                >
                                                    City
                                                </FormLabel>
                                                {touched.billToCity &&
                                                    errors.billToCity && (
                                                        <ErrorMessage
                                                            name='billToCity'
                                                            render={msg => (
                                                                <Text color='error'>
                                                                    {msg}
                                                                </Text>
                                                            )}
                                                        />
                                                    )}
                                            </Flex>
                                            <Input
                                                color={boldTextColor}
                                                _placeholder={{
                                                    color: placeHolderColor,
                                                }}
                                                border={
                                                    touched.billToCity &&
                                                    errors.billToCity
                                                        ? errorBorder
                                                        : borderColor
                                                }
                                                w={['100%']}
                                                name='billToCity'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.billToCity}
                                            />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={1}>
                                        <FormControl>
                                            <Flex justify={'space-between'}>
                                                <FormLabel
                                                    color={
                                                        touched.billToPostCode &&
                                                        errors.billToPostCode
                                                            ? 'error'
                                                            : statusColor
                                                    }
                                                >
                                                    Post Code
                                                </FormLabel>
                                                {touched.billToPostCode &&
                                                    errors.billToPostCode && (
                                                        <ErrorMessage
                                                            name='billToPostCode'
                                                            render={msg => (
                                                                <Text color='error'>
                                                                    {msg}
                                                                </Text>
                                                            )}
                                                        />
                                                    )}
                                            </Flex>
                                            <Input
                                                color={boldTextColor}
                                                _placeholder={{
                                                    color: placeHolderColor,
                                                }}
                                                border={
                                                    touched.billToPostCode &&
                                                    errors.billToPostCode
                                                        ? errorBorder
                                                        : borderColor
                                                }
                                                w={['100%']}
                                                name='billToPostCode'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.billToPostCode}
                                            />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={1}>
                                        <FormControl>
                                            <Flex justify={'space-between'}>
                                                <FormLabel
                                                    color={
                                                        touched.billToCountry &&
                                                        errors.billToCountry
                                                            ? 'error'
                                                            : statusColor
                                                    }
                                                >
                                                    Country
                                                </FormLabel>
                                                {touched.billToCountry &&
                                                    errors.billToCountry && (
                                                        <ErrorMessage
                                                            name='billToCountry'
                                                            render={msg => (
                                                                <Text color='error'>
                                                                    {msg}
                                                                </Text>
                                                            )}
                                                        />
                                                    )}
                                            </Flex>
                                            <Input
                                                color={boldTextColor}
                                                _placeholder={{
                                                    color: placeHolderColor,
                                                }}
                                                border={
                                                    touched.billToCountry &&
                                                    errors.billToCountry
                                                        ? errorBorder
                                                        : borderColor
                                                }
                                                w={['100%']}
                                                name='billToCountry'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.billToCountry}
                                            />
                                        </FormControl>
                                    </GridItem>
                                </Grid>
                                <Grid
                                    templateColumns={'repeat(2,1fr)'}
                                    mb={['24px']}
                                    gap={['24px']}
                                    w={['100%']}
                                >
                                    <GridItem colSpan={1}>
                                        <FormControl>
                                            <Flex justify={'space-between'}>
                                                <FormLabel
                                                    color={
                                                        touched.invoiceDate &&
                                                        errors.invoiceDate
                                                            ? 'error'
                                                            : statusColor
                                                    }
                                                >
                                                    Invoice Date
                                                </FormLabel>
                                                {touched.invoiceDate &&
                                                    errors.invoiceDate && (
                                                        <ErrorMessage
                                                            name='invoiceDate'
                                                            render={msg => (
                                                                <Text color='error'>
                                                                    {msg}
                                                                </Text>
                                                            )}
                                                        />
                                                    )}
                                            </Flex>
                                            <Input
                                                color={boldTextColor}
                                                _placeholder={{
                                                    color: placeHolderColor,
                                                }}
                                                type='date'
                                                border={
                                                    touched.invoiceDate &&
                                                    errors.invoiceDate
                                                        ? errorBorder
                                                        : borderColor
                                                }
                                                w={['100%']}
                                                name='invoiceDate'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.invoiceDate}
                                            />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={1}>
                                        <FormControl>
                                            <Flex justify={'space-between'}>
                                                <FormLabel
                                                    color={
                                                        touched.paymentTerms &&
                                                        errors.paymentTerms
                                                            ? 'error'
                                                            : statusColor
                                                    }
                                                >
                                                    Payment Terms
                                                </FormLabel>
                                                {touched.paymentTerms &&
                                                    errors.paymentTerms && (
                                                        <ErrorMessage
                                                            name='paymentTerms'
                                                            render={msg => (
                                                                <Text color='error'>
                                                                    {msg}
                                                                </Text>
                                                            )}
                                                        />
                                                    )}
                                            </Flex>
                                            <Select
                                                name='paymentTerms'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.paymentTerms}
                                                color={boldTextColor}
                                                fontSize='12px'
                                                fontWeight='700'
                                                _placeholder={{
                                                    color: placeHolderColor,
                                                }}
                                                border={
                                                    touched.paymentTerms &&
                                                    errors.paymentTerms
                                                        ? errorBorder
                                                        : borderColor
                                                }
                                                h={['56px']}
                                            >
                                                {paymentTerms.map((el, idx) => (
                                                    <option
                                                        key={idx}
                                                        value={el.value}
                                                    >
                                                        {el.label}
                                                    </option>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </GridItem>
                                </Grid>
                                <FormControl>
                                    <Flex justify={'space-between'}>
                                        <FormLabel
                                            color={
                                                touched.projectDescription &&
                                                errors.projectDescription
                                                    ? 'error'
                                                    : statusColor
                                            }
                                        >
                                            Project Description
                                        </FormLabel>
                                        {touched.projectDescription &&
                                            errors.projectDescription && (
                                                <ErrorMessage
                                                    render={msg => (
                                                        <Text color='error'>
                                                            {msg}
                                                        </Text>
                                                    )}
                                                    name='projectDescription'
                                                />
                                            )}
                                    </Flex>
                                    <Input
                                        color={boldTextColor}
                                        _placeholder={{
                                            color: placeHolderColor,
                                        }}
                                        border={
                                            touched.projectDescription &&
                                            errors.projectDescription
                                                ? errorBorder
                                                : borderColor
                                        }
                                        placeholder='e.g. Graphic Design Service'
                                        w={['100%']}
                                        name='projectDescription'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.projectDescription}
                                    />
                                </FormControl>
                                <Heading
                                    fontSize={'18px'}
                                    fontWeight='700'
                                    mt={['32px']}
                                    mb={['16px']}
                                    color='#777F98'
                                >
                                    Item List
                                </Heading>
                                <Grid
                                    templateColumns={['repeat(10,1fr)']}
                                    mb={['16px']}
                                    columnGap={['16px']}
                                    display={['none', 'grid']}
                                >
                                    <GridItem colSpan={[3, 4]}>
                                        <Text color={statusColor}>
                                            Item Name
                                        </Text>
                                    </GridItem>
                                    <GridItem colSpan={[2, 1]}>
                                        <Text color={statusColor}>
                                            Quantity
                                        </Text>
                                    </GridItem>
                                    <GridItem colSpan={[2, 2]}>
                                        <Text color={statusColor}>Price</Text>
                                    </GridItem>
                                    <GridItem colSpan={[2, 2]}>
                                        <Text color={statusColor}>Total</Text>
                                    </GridItem>
                                </Grid>
                                {formArray.map((item, idx) => (
                                    <Grid
                                        key={idx}
                                        templateColumns={[
                                            'repeat(6,1fr)',
                                            'repeat(10,1fr)',
                                        ]}
                                        mb={['16px']}
                                        columnGap={['16px']}
                                        rowGap={['24px']}
                                    >
                                        <GridItem colSpan={[6, 3, 4]}>
                                            <Text
                                                color={statusColor}
                                                mb='16px'
                                                display={['flex', 'none']}
                                            >
                                                Item Name
                                            </Text>

                                            <Input
                                                w={['100%']}
                                                color={boldTextColor}
                                                _placeholder={{
                                                    color: placeHolderColor,
                                                }}
                                                name='name'
                                                value={item.name}
                                                onChange={e =>
                                                    handleFormArrayChange(
                                                        e,
                                                        idx,
                                                    )
                                                }
                                            />
                                        </GridItem>
                                        <GridItem colSpan={[1, 2, 1]}>
                                            <Text
                                                color={statusColor}
                                                mb='16px'
                                                display={['flex', 'none']}
                                            >
                                                Quantity
                                            </Text>

                                            <Input
                                                p='12px'
                                                w={['100%']}
                                                type='number'
                                                color={boldTextColor}
                                                _placeholder={{
                                                    color: placeHolderColor,
                                                }}
                                                name='quantity'
                                                value={item.quantity}
                                                onChange={e =>
                                                    handleFormArrayChange(
                                                        e,
                                                        idx,
                                                    )
                                                }
                                            />
                                        </GridItem>
                                        <GridItem colSpan={[2, 2]}>
                                            <Text
                                                color={statusColor}
                                                mb='16px'
                                                display={['flex', 'none']}
                                            >
                                                Price
                                            </Text>

                                            <Input
                                                w={['100%']}
                                                color={boldTextColor}
                                                _placeholder={{
                                                    color: placeHolderColor,
                                                }}
                                                type='number'
                                                value={item.price}
                                                name='price'
                                                onChange={e =>
                                                    handleFormArrayChange(
                                                        e,
                                                        idx,
                                                    )
                                                }
                                            />
                                        </GridItem>
                                        <GridItem colSpan={2}>
                                            <Text
                                                color={statusColor}
                                                mb='16px'
                                                display={['flex', 'none']}
                                            >
                                                Total
                                            </Text>

                                            <Input
                                                w={['100%']}
                                                color={boldTextColor}
                                                _placeholder={{
                                                    color: placeHolderColor,
                                                }}
                                                value={
                                                    Number(item.quantity) *
                                                    Number(item.price)
                                                }
                                                name='total'
                                                disabled
                                            />
                                        </GridItem>
                                        <GridItem
                                            colSpan={1}
                                            alignItems='center'
                                            justifyContent={'center'}
                                            display={'flex'}
                                        >
                                            <Icon
                                                _hover={{ color: 'error' }}
                                                cursor='pointer'
                                                color='#888EB0'
                                                as={FaTrash}
                                                onClick={() =>
                                                    removeFromList(idx)
                                                }
                                            />
                                        </GridItem>
                                    </Grid>
                                ))}
                                <Button
                                    h={['48px']}
                                    color={btnColor}
                                    bgColor={btnBgColor}
                                    leftIcon={<FaPlus />}
                                    _hover={{
                                        bgColor: '#DFE3FA50',
                                    }}
                                    w='100%'
                                    onClick={addToFormList}
                                >
                                    Add New Item
                                </Button>

                                <Flex
                                    justify={'flex-end'}
                                    gap={'8px'}
                                    mt={['40px']}
                                    mb={'32px'}
                                >
                                    <Button
                                        variant={'secondary'}
                                        onClick={() => navigate(`/`)}
                                    >
                                        Discard
                                    </Button>

                                    <Button
                                        type='submit'
                                        _disabled={{
                                            bgColor: 'gray',
                                            cursor: 'not-allowed',
                                        }}
                                        _hover={{}}
                                        data-testid='save-new-invoice'
                                    >
                                        Save
                                    </Button>
                                </Flex>
                            </form>
                        )}
                    </Formik>
                </Box>
            </Box>
        </Box>
    )
}

export default CreateInvoice
