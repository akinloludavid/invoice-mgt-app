export const TextStyle = {
  // style object for base or default style
  baseStyle: {
    color: "#0C0E16",
  },
  // styles for different sizes ("sm", "md", "lg")
  sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {
    body1: {
      fontSize: "12px",
      fontWeight: "500",
      lineHeight: "15px",
      color: "#0C0E16",
      // letterSpacing: "10px",
    },
    body2: {
      fontSize: "11px",
      fontWeight: "500",
      lineHeight: "18px",
      letterSpacing: "1px",
    },
    bold: {
      fontSize: "15px",
      fontWeight: "700",
      lineHeight: "20px",
    },
    error: {
      fontSize: "12px",
      fontWeight: "500",
      lineHeight: "17px",
      letterSpacing: "1px",
    },
  },
  // default values for `size` and `variant`
  defaultProps: {
    variant: "body1",
  },
};
