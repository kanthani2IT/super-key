// ==============================|| OVERRIDES - TABS ||============================== //

export default function Tabs(theme) {
  return {
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: theme.palette.success.main, // Set the background color of the indicator
          height: 3, // Set the height of the indicator
          borderRadius: 2, // Optional: Add rounded corners
        },
        root: {
          color: theme.palette.text.success,
          "&.Mui-selected": {
            color: theme.palette.text.success,
          },
        },
      },
    },
  };
}
