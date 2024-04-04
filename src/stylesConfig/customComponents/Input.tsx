// https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/components/input.ts

const primary = {
  field: {
    caretColor: "#9277FF",
    borderRadius: "4px",
    padding: "18px 24px",
    border: "1px solid #DFE3FA",
    outline: "none",
    bgColor: "transparent",
    fontSize: "12px",
    fontWeight: "700",
    lineHeight: "15px",
    w: ["309px"],
    h: "56px",
    color: "#0C0E16",
    _placeholder: {
      color: "#000000",
      opacity: 0.4,
      fontSize: ["14px"],
      fontWeight: "700",
      lineHeight: "19px",
    },
    _focus: {
      border: "1px solid #9277FF",
    },
  },
};

export const InputStyles = {
  baseStyle: {},
  variants: {
    primary,
  },
  defaultProps: {
    variant: "primary",
  },
};
