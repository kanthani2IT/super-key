export default function TextField() {
  return {
    MuiTextField: {
      styleOverrides: {
        root: {
          background: "#F7F9FB",
          borderRadius: "4px",
          "& .MuiOutlinedInput-root": {
            // padding: "6px 10px",
            // borderRadius: "8px",
            "& fieldset": {
              borderColor: "#c0c0c0",
            },
            "&:hover fieldset": {
              borderColor: "#c0c0c0",
            },
          },
          "& .MuiInputBase-input": {
            padding: "8px 0",
            fontWeight: "600",
            fontSize: "1rem",
            borderRadius: "8px",

            "&::placeholder": {
              color: "#757575", // Placeholder color
              //   opacity: 0.5, // Full opacity for placeholder
            },
          },
        },
      },
    },
  };
}
