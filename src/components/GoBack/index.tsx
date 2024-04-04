import React from 'react'
import { Button, useColorModeValue } from '@chakra-ui/react'
import { MdChevronLeft } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
const GoBack = () => {
    const navigate = useNavigate()
    const boldTextColor = useColorModeValue('#0C0E16', '#ffffff')

    const goBack = () => {
        navigate(-1)
    }
    return (
        <Button
            fontSize={'12px'}
            fontWeight='700'
            variant={'link'}
            color={boldTextColor}
            opacity={1}
            bgColor='transparent'
            leftIcon={<MdChevronLeft color='#7C5DFA' />}
            onClick={goBack}
            gap='24px'
        >
            Go Back
        </Button>
    )
}

export default GoBack
