export default function Select() {
  return {
    MuiSelect: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            border: `0.5px solid #c0c0c0`, // Default border color
            borderRadius: "4px",
            "& fieldset": {
              borderColor: "#c0c0c0", // Default fieldset border color
            },
            "&:hover fieldset": {
              borderColor: "#c0c0c0", // Prevent hover from changing color
            },
          },
          "& .MuiInputBase-input": {
            padding: "8px 0",
            fontWeight: "600",
            fontSize: "1rem",
            "&::placeholder": {
              color: "#757575", // Placeholder color
            },
          },
        },
        select: {
          backgroundColor: "#F7F9FB", // Default background color
          fontWeight: "600",
          fontSize: "1rem",
          borderRadius: "4px",
          border: `0.5px solid #c0c0c0`, // Default border color
          "&:focus": {
            backgroundColor: "#F7F9FB", // Background remains consistent on focus
          },
          "&:hover": {
            borderColor: "#c0c0c0", // Prevent hover from changing border color
          },
        },
        icon: {
          color: "#757575", // Default icon color
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#c0c0c0", // Default border color for notched outline
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#c0c0c0", // Prevent hover from changing border color
          },
        },
      },
    },
  };
}
