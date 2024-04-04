import React from 'react'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { IChildren } from '../../utils/types'
import { Box } from '@chakra-ui/react'
import { textVariants } from '../../utils/animations'

interface IAnimationView extends IChildren {
    delay?: number
}
export const AnimatedView = ({ children, delay = 0.2 }: IAnimationView) => {
    const ref = useRef(null)
    const isInView = useInView(ref, {
        once: true,
    })
    return (
        <>
            <Box
                ref={ref}
                as={motion.span}
                initial={{ opacity: 0, y: 20 }}
                whileInView={isInView ? textVariants(delay) : undefined}
            >
                {children}
            </Box>
        </>
    )
}

export const AnimatedImg = ({ children, delay = 0.2 }: IAnimationView) => {
    const ref = useRef(null)
    const isInView = useInView(ref, {
        once: true,
        margin: '20px 0px 50px 0px',
    })
    return (
        <section ref={ref}>
            <Box
                as={motion.section}
                initial={{ scale: 1.2 }}
                animate={
                    isInView
                        ? {
                              scale: 1,
                              transition: {
                                  duration: 1,
                                  delay,
                              },
                          }
                        : undefined
                }
            >
                {children}
            </Box>
        </section>
    )
}
