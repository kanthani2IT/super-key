import { ExpandLess, ExpandMore } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Button, Card, Stack, Typography, styled } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MessageIcon from "assets/images/dashboard/MessageIcon";
import Dot from "components/@extended/Dot";
import CircularLoader from "components/CircularLoader";
import NoDataMessage from "components/NoDataMessage";
import { useState } from "react";

const getStatus = (status) => {
  let color;

  switch (status) {
    case "COMPLETED":
      color = "success";
      break;
    case "PENDING":
      color = "error";
      break;
    default:
      color = "grey";
  }

  return color;
};

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

export const ColorRow = ({
  bgcolor,
  title,
  data,
  dark,
  main,
  borderRadius = "15px",
  status = "",
  property = "",
}) => {
  const theme = useTheme();
  return (
    <Card sx={{ "&.MuiPaper-root": { boxShadow: "0 0 !important" } }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.palette.primary.lighter,
        }}
      >
        {title && (
          <>
            <Typography sx={{ flexBasis: "5%" }}>
              <CheckCircleIcon />
            </Typography>

            <Box
              sx={{
                flexBasis: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor,
                color: dark ? "grey.800" : "#ffffff",
                border: main ? "1px dashed" : "1px solid transparent",
                p: 2,
                borderRadius,
              }}
            >
              <Typography
                variant="subtitle1"
                color="#323C4D"
                sx={{ flexBasis: "75%" }}
              >
                {title}
              </Typography>

              <Box
                variant="h3"
                color="#323C4D"
                sx={{ flexBasis: "20%", textAlign: "center" }}
              >
                <Dot color={status} />
              </Box>

              <Typography
                variant="h3"
                color="#323C4D"
                sx={{ flexBasis: "20%", textAlign: "center" }}
              >
                {property}
              </Typography>
            </Box>

            <Box
              sx={{
                flexBasis: "10%",
                display: "flex",
                gap: 2,
                pl: 2,
                alignItems: "center",
              }}
            >
              <Button size="small" variant="outlined">
                View
              </Button>

              <Button>
                <MessageIcon />
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Card>
  );
};
const TableHeader = ({ open, handleClick }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        borderRadius: "15px",
        p: "0.5rem 1rem",
        fontWeight: "bold",
      }}
    >
      <Typography sx={{ flexBasis: "5%" }}></Typography>
      <Typography
        variant="subtitle1"
        color="#323C4D"
        sx={{ flexBasis: "75%", textAlign: "left" }}
      ></Typography>
      <Button
        size="large"
        sx={{ flexBasis: "20%", textAlign: "center" }}
        onClick={handleClick}
        endIcon={
          open ? (
            <ExpandLess color={"secondary"} fontSize="medium" />
          ) : (
            <ExpandMore color={"secondary"} fontSize="medium" />
          )
        }
        disableRipple
        disableElevation
        disableFocusRipple
        color="#323C4D"
      >
        Status
      </Button>
      <Typography
        variant="h6"
        color="#323C4D"
        sx={{ flexBasis: "20%", textAlign: "center" }}
      >
        Property
      </Typography>
      <Box sx={{ flexBasis: "11%" }} />
      <Typography
        variant="h6"
        color="#323C4D"
        sx={{ flexBasis: "10%", textAlign: "center" }}
      >
        Action
      </Typography>
      <Box sx={{ flexBasis: "3%" }} />
    </Box>
  );
};
const TaskTable = ({ tableData, loading }) => {
  console.log(tableData);
  console.log(loading);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack sx={{ mt: 1 }}>
      <TableHeader
        open={open}
        handleClick={handleClick}
        handleClose={handleClose}
      />
      <Box sx={{ overflow: "auto", height: "15rem", p: 2 }}>

        {loading ? (
          <CircularLoader />
        ) : tableData && tableData.length > 0 ? (
          <Stack rowGap={1.5}>
            {tableData?.map((row, index) => {
              const status = getStatus(row?.status);
              return (
                <ColorRow
                  key={row?.index}
                  title={row?.description}
                  status={status}
                  property={row?.property}
                  bgcolor={
                    row?.status === "COMPLETED" ? "grey.300" : `error.lighter`
                  }
                  borderRadius={"15px"}
                />
              );
            })}
          </Stack>
        ) : (
          <NoDataMessage />
        )}
      </Box>
    </Stack>
  );
};

export default TaskTable;
