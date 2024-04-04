export const ButtonStyles = {
    // style object for base or default style
    baseStyle: {
        outline: 'none',
        _focus: { boxShadow: 'none' },
    },
    // styles for different sizes ("sm", "md", "lg")
    sizes: {},
    // styles for different visual variants ("outline", "solid")
    variants: {
        primary: () => ({
            bgColor: '#7C5DFA',
            width: 'auto',
            height: '48px',
            borderRadius: '24px',
            fontSize: '12px',
            fontWeight: '700',
            lineHeight: '15px',
            color: '#ffffff',
            _hover: {
                bgColor: '#9277FF',
            },
        }),
        delete: () => ({
            bgColor: '#EC5757',
            height: '48px',
            borderRadius: '24px',
            width: 'auto',
            fontSize: '12px',
            fontWeight: '700',
            lineHeight: '15px',
            color: '#fff',
            _hover: {
                bgColor: '#FF9797',
            },
        }),
        secondary: () => ({
            bg: '#F9FAFE',
            width: 'auto',
            height: '48px',
            fontSize: '13px',
            fontWeight: '700',
            lineHeight: '18px',
            color: '#7E88C3',
            borderRadius: '24px',
            border: 'none',
            _hover: {
                bgColor: '#DFE3FA',
                color: '#7E88C3',
            },
        }),
        link: () => ({
            bgColor: 'transparent',
            height: '48px',
            width: 'auto',
            fontSize: '12px',
            fontWeight: '700',
            lineHeight: '18px',
            color: 'textColor',
            borderRadius: '0px',
            border: '0px',
            textDecoration: 'none',
            _hover: {
                bgColor: 'none',
                color: '#7E88C3',
                opacity: '1',
                textDecoration: 'none',
            },
            '@media (max-width:480px)': {
                maxWidth: '160px',
            },
        }),
    },

    // default values for `size` and `variant`
    defaultProps: {
        variant: 'primary',
    },
}
