import styled from "@emotion/styled";
import {
  alpha,
  Box,
  Button,
  Card,
  Grid2 as Grid,
  Menu,
  MenuItem,
  Modal,
  Step,
  StepConnector,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";

export const StyledTypography = styled(Typography)(({ theme, color }) => ({
  color: color ?? theme.palette.text.grey,
}));

export const Image = styled("img")`
  height: ${(props) => props.height || "50vh"};
  width: ${(props) => props.width || "100%"};
`;

export const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    padding: "6px 10px",
    borderRadius: "8px",
    "& fieldset": {
      borderColor: "#EBEEF2",
    },
    "&:hover fieldset": {
      borderColor: "#EBEEF2",
    },
  },

  "& .MuiInputBase-input": {
    borderRadius: "8px",
    padding: "8px 0",
    fontWeight: "600",
    fontSize: "1rem",
    background: "none",
    "& fieldset": {
      borderColor: "#EBEEF2",
    },
    "&:hover fieldset": {
      borderColor: "#EBEEF2",
    },
    "&::placeholder": {
      color: "#98A2B2", // Set the placeholder color here
      opacity: 1,
      fontWeight: "600", // Ensure the placeholder is fully opaque
    },
  },
});

export const BootstrapInput = styled(TextField)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: "#F3F6F9",
    border: "1px solid",
    borderColor: "#E0E3E7",
    fontSize: 16,
    //   width: 'auto',
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
      borderColor: "#2D3843",
    }),
  },
}));
export const BoldTypographyHeader = styled(Typography)({
  fontWeight: "600",
  fontSize: "14px",
  color: " #000000",
});

export const communityStyles = {
  container: (height) => ({
    height,
    width: "100%",
    overflow: "auto",
  }),
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px",
    backgroundColor: "#F7F9FB",
    marginBottom: "16px",
    borderRadius: "8px",
  },
  searchInput: {
    width: "240px",
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#FFFFFF !important",
      borderRadius: "6px",
      height: "36px",
      "&.Mui-focused fieldset": {
        borderColor: "#278B5C",
      },
    },
  },
  searchIcon: {
    color: "#278B5C",
  },
  iconGroup: {
    display: "flex",
    gap: "16px",
  },
  icon: {
    color: "#000000",
  },
  noData: {
    height: "200px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "16px",
    color: "#6c757d",
  },
  claims: {
    color: "#278B5C",
    paddingLeft: "30px",
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "28px",
    position: "relative",
  },
  paginationText: {
    fontSize: "14px",
    color: "#6c757d",
  },
  pagination: {
    position: "absolute",
    left: "50%",
    fontSize: "12px",
    transform: "translateX(-50%)",
    "& .MuiPaginationItem-root": {
      border: "none",
    },
    "& .Mui-selected": {
      fontWeight: "bold",
    },
  },
};

export const communityAssetButton = {
  buttonColor: {
    color: "#E9E9E9",
    height: "50px",
    width: "100px",
    textColor: "#7B828F",
    variant: "contained",
  },
};

export const StyledModal = styled(Modal)`
  backdrop-filter: blur(8px);
  background-color: rgba(0, 0, 0, 0.5);
`;

export const CloseButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: #fff;
  color: #7b828f;
  border-radius: 0.5rem;
  padding: 0.6rem 2.3rem;
  font-size: 0.75rem;
  font-weight: 700;
  &:hover {
    background-color: #fff;
    color: #7b828f;
  }
`;

export const TabsContainer = styled(Box)`
  width: 50vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const StyledTabs = styled(Tabs)`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  .MuiTab-root {
    text-transform: none;
    font-weight: 500;
    padding: 0.4rem 1.5rem;
    background: white;
    color: #000;
    font-size: 0.75rem;
    border-radius: 1rem;
    min-height: 2rem;
    margin: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: center;

    &.Mui-selected {
      color: #000;
      background-color: #d8e0ff;
      font-weight: bold;
    }
  }
  .MuiTabs-indicator {
    display: none;
  }
`;

export const TabContent = styled(Box)`
  background-color: white;
  height: 75vh;
  overflow: auto;
  padding: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

export const HeaderContainer = styled(Grid)`
  display: flex;
  justify-content: flex-end;
  margin-right: 2rem;
`;

export const CenteredGrid = styled(Grid)`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const StyledMenu = styled(Menu)(({ theme }) => ({
  borderRadius: "0.625rem",
  boxShadow: "#00000045 0px 7px 29px 0px",
}));

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  "&:hover": {
    backgroundColor: "#E9F3FF",
    borderRadius: "0.625rem",
    color: "black",
  },
  margin: "0px 10px 0px 10px",

  padding: "10px",
  color: "#656565",
}));

export const CustomStep = styled(Step)(({ theme }) => ({
  "&:not(:last-of-type)": {
    marginRight: "2px",
  },
}));

export const CustomConnector = styled(StepConnector)(({ theme }) => ({
  "& .MuiStepConnector-line": {
    height: 9,
    border: 0,
    borderRadius: 10,
    backgroundColor: "#B0B0B0",
    width: "5vw",
  },
  "&.Mui-active, &.Mui-completed": {
    "& .MuiStepConnector-line": {
      backgroundColor: theme.palette.success.dark,
    },
  },
}));

export const StyledDashboardCard = styled(Card)(({ theme }) => ({
  "&.MuiPaper-root": { boxShadow: "0 0 !important" },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "0.625rem", // Setting border radius
  border: `0.5px solid ${theme.palette.primary.main}`, // Border style
  background: " #FFF", // Background color
  color: theme.palette.primary.main, // Optional: text color based on theme
  padding: "8px 16px", // Optional: padding for the button
  "&:hover": {
    border: "0.5px solid #ffffff",
    color: " #FFF",
    background: theme.palette.primary.main, // Optional: change background on hover
  },
}));

export const RadiusStyledButton = styled(Button)(
  ({ theme, color, height, width, textColor, borderRadius }) => ({
    width: width || "200px",
    height: height || "50px",
    borderRadius: borderRadius || "32px",
    padding: "15px 29px",
    gap: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color || "#288B5B",
    color: textColor || "#FFFFFF",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: color ? color : theme.palette.success.main,
    },
  })
);
