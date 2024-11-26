// ==============================|| OVERRIDES - TAB ||============================== //

export default function Tab(theme) {
  return {
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 46,
          color: theme.palette.text.main,
          borderRadius: 4,

          "&:hover": {
            color: theme.palette.success.dark,
          },
          "&:focus-visible": {
            borderRadius: 4,
            outline: `2px solid ${theme.palette.success.dark}`,
            outlineOffset: -3,
          },
          "&.Mui-selected": {
            color: theme.palette.text.success,
          },
        },
      },
      defaultProps: {
        disableRipple: true, // Disable the ripple effect
      },
    },
  };
}
