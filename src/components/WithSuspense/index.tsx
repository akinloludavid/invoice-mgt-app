import { Flex, Heading, Spinner } from '@chakra-ui/react'
import React, { Suspense } from 'react'

const LazyLoader = () => {
    return (
        <Flex
            justify={'center'}
            align='center'
            w='100%'
            h='100vh'
            flexDir={['column']}
            gap='24px'
        >
            <Spinner color='pryColor' />
            <Heading variant={'h2'} fontSize={['32px']}>
                Loading...
            </Heading>
        </Flex>
    )
}
const WithSuspense = (Component: React.FC) => (props: any) => {
    return (
        <Suspense fallback={<LazyLoader />}>
            <Component {...props} />
        </Suspense>
    )
}

export default WithSuspense
