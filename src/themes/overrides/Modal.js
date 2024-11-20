export default function Modal(theme) {
  return {
    MuiModal: {
      styleOverrides: {
        root: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0px 4px 20px rgba(0, 0, 0, 0.2), 0px 4px 10px ${theme.palette.success.main}`,
        },
      },
    },
  };
}
