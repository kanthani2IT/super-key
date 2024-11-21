// ==============================|| DEFAULT THEME - TYPOGRAPHY ||============================== //

export default function Typography(fontFamily) {
  return {
    htmlFontSize: 16,
    fontFamily,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    title: {
      fontWeight: 400,
      fontSize: "1.8rem",
      lineHeight: 1.57,
      [`@media (max-width:600px)`]: {
        fontSize: "1.5rem", // Smaller size for mobile
      },
    },
    h1: {
      fontWeight: 600,
      fontSize: "2.375rem",
      lineHeight: 1.21,
      [`@media (max-width:600px)`]: {
        fontSize: "1.875rem",
      },
    },
    h2: {
      fontWeight: 700,
      fontSize: "1.475rem",
      lineHeight: 1.27,
      [`@media (max-width:600px)`]: {
        fontSize: "1.5rem",
      },
    },
    h3: {
      fontWeight: 700,
      fontSize: "0.9375rem",
      lineHeight: 1.33,
      [`@media (max-width:600px)`]: {
        fontSize: "0.9175rem",
      },
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.25rem",
      lineHeight: 1.4,
      [`@media (max-width:600px)`]: {
        fontSize: "1rem",
      },
    },
    h5: {
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: 1.5,
      [`@media (max-width:600px)`]: {
        fontSize: "0.875rem",
      },
    },
    h6: {
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.57,
      [`@media (max-width:600px)`]: {
        fontSize: "0.875rem",
      },
    },
    caption: {
      fontWeight: 400,
      fontSize: "0.75rem",
      lineHeight: 1.66,
      [`@media (max-width:600px)`]: {
        fontSize: "0.625rem",
      },
    },
    body1: {
      fontSize: "0.875rem",
      lineHeight: 1.57,
      [`@media (max-width:600px)`]: {
        fontSize: "0.75rem",
      },
    },
    body2: {
      fontSize: "0.75rem",
      lineHeight: 1.66,
      [`@media (max-width:600px)`]: {
        fontSize: "0.625rem",
      },
    },
    subtitle1: {
      fontSize: "0.875rem",
      fontWeight: 600,
      lineHeight: 1.57,
      [`@media (max-width:600px)`]: {
        fontSize: "0.75rem",
      },
    },
    subtitle2: {
      fontSize: "1.125rem",
      fontWeight: 700,
      lineHeight: 1.66,
      [`@media (max-width:600px)`]: {
        fontSize: "0.875rem",
      },
    },
    overline: {
      lineHeight: 1.66,
      [`@media (max-width:600px)`]: {
        fontSize: "0.625rem",
      },
    },
    button: {
      textTransform: "capitalize",
      fontSize: "0.875rem",
      [`@media (max-width:600px)`]: {
        fontSize: "0.75rem",
      },
    },
  };
}
