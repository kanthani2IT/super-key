// ==============================|| OVERRIDES - TABLE CELL ||============================== //

export default function TableCell(theme) {
  const commonCell = {
    "&:not(:last-of-type)": {
      position: "relative",
      "&:after": {
        position: "absolute",
        content: '""',
        width: 1,
        height: "calc(100% - 30px)",
        right: 0,
        top: 16,
      },
    },
  };

  return {
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: theme.palette.success.lighter, // Change selected row background
            "&:hover": {
              backgroundColor: theme.palette.success.light, // Optional: Hover effect
            },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
          padding: 12,
          "&.cell-right": {
            justifyContent: "flex-end",
            textAlign: "right",
            "& > *": {
              justifyContent: "flex-end",
              margin: "0 0 0 auto",
            },
            "& .MuiOutlinedInput-input": {
              textAlign: "right",
            },
          },
          "&.cell-center": {
            justifyContent: "center",
            textAlign: "center",
            "& > *": {
              justifyContent: "center",
              margin: "0 auto",
            },
          },
        },
        sizeSmall: {
          padding: 8,
        },
        head: {
          fontSize: "0.75rem",
          fontWeight: 700,
          // textTransform: "uppercase",
          ...commonCell,
        },
        footer: {
          fontSize: "0.75rem",
          // textTransform: "uppercase",
          ...commonCell,
        },
      },
    },
  };
}
