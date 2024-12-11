// ==============================|| OVERRIDES - TABLE CELL ||============================== //

export default function TableCell(theme) {
  const commonCell = {
    "&:not(:last-of-type)": {
      // position: "relative", // Consider removing this if sticky headers break
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
            backgroundColor: theme.palette.success.lighter,
            "&:hover": {
              backgroundColor: theme.palette.success.light,
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
          position: "sticky",
          top: 0,
          zIndex: theme.zIndex.appBar,
          backgroundColor: theme.palette.background.paper,
          ...commonCell,
        },
        footer: {
          fontSize: "0.75rem",
          position: "sticky", // Sticky footer
          bottom: 0,
          zIndex: theme.zIndex.appBar - 1,
          backgroundColor: theme.palette.background.paper,

          ...commonCell,
        },
      },
    },
  };
}
