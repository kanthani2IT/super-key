// ==============================|| OVERRIDES - TYPOGRAPHY ||============================== //

export default function Typography(theme) {
  return {
    MuiTypography: {
      styleOverrides: {
        gutterBottom: {
          marginBottom: 12,
        },
      },
      variants: [
        {
          props: { variant: "subtitle1" },
          // style: {
          //   color: theme.palette.text.primary,
          // },
        },
      ],
    },
  };
}
