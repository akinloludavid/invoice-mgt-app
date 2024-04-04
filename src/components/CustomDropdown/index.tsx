import React from 'react'
import { Box, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react'
import { FaChevronDown } from 'react-icons/fa'

interface IOptions {
    label: string
    value: string
}
interface ICustomDropdownProps {
    options: IOptions[]
    value: string
    placeholder: string
    onChange: (e: string) => void
}
const CustomDropdown = ({
    options = [],
    value = '',
    placeholder = '',
    onChange,
}: ICustomDropdownProps) => {
    const boldTextColor = useColorModeValue('#0C0E16', '#ffffff')
    const handleDropdownValue = (val: string) => {
        onChange(val)
    }
    return (
        <Box>
            <Flex>
                <Text
                    color={boldTextColor}
                    fontSize={['15px']}
                    fontWeight='500'
                >
                    {value ? value : placeholder}
                </Text>
                <Icon as={FaChevronDown} color='#7C5DFA' />
            </Flex>
            <Flex>
                {options.map(el => (
                    <Box key={el.value}>
                        <Text onClick={() => handleDropdownValue(el.value)}>
                            {el.label}
                        </Text>
                    </Box>
                ))}
            </Flex>
        </Box>
    )
}

export default CustomDropdown
