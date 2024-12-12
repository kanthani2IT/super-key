export default function TextField() {
  return {
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          "& .MuiOutlinedInput-root": {
            background: "#F7F9FB",
            boxShadow: "none !important",
          },
          "& .MuiInputBase-input": {
            fontWeight: "400",

            fontSize: "1rem",
            "&::placeholder": {
              color: "#757575",
              opacity: 0.5,
              fontWeight: "400",
              fontSize: "0.9rem",
            },
          },
        },
      },
    },
  };
}
