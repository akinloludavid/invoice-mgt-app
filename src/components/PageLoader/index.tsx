import React from 'react'
import { Skeleton } from '@chakra-ui/react'

const TableLoader = ({ row = 6 }) => {
    return (
        <>
            {new Array(row).fill(0).map((_, i) => (
                <Skeleton
                    key={i}
                    height={['100px', '60px', '60px']}
                    mb={6}
                    borderRadius='8px'
                ></Skeleton>
            ))}
        </>
    )
}

export default TableLoader
