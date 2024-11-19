export default function Divider(theme) {
  return {
    MuiDivider: {
      styleOverrides: {
        root: {
          color: theme.palette.divider,
        },
      },
    },
  };
}
