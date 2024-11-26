import { Box, Button, Stack, Typography, styled } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Dot from "components/@extended/Dot";
import AppSkeleton from "components/AppComponents/AppSkeleton";
import NoDataMessage from "components/NoDataMessage";
import { StyledDashboardCard } from "./StyledComponent";

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

export const RadiusStyledButton = styled(Button)(({ theme, color, height, width, textColor, borderRadius }) => ({
  width: width || '200px',
  height: height || '50px',
  borderRadius: borderRadius || '32px',
  padding: '15px 29px',
  gap: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: color || "#288B5B",
  color: textColor || '#FFFFFF',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: color ? color : theme.palette.success.main,
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
    <StyledDashboardCard>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: ' 0.5rem 0.9375rem 0.5rem 1.125rem',
          bgcolor,
          color: dark ? 'grey.800' : '#ffffff',
          border: main ? '1px dashed' : '1px solid transparent'
        }}
      >
        {title && (
          <>

            <Typography variant="subtitle1" color="#323C4D" sx={{ flexBasis: '80%' }}>
              {title}
            </Typography>

            <Box
              sx={{
                flexBasis: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor,
                color: dark ? "grey.800" : theme.palette.background.default,
                border: main ? "1px dashed" : "1px solid transparent",
                p: 2,
                borderRadius,
              }}
            >
              <Typography
                variant="h6"
                color={theme.palette.text.primary}
                sx={{ flexBasis: "75%" }}
              >
                {title}
              </Typography>

              <Box
                variant="h3"
                color={theme.palette.text.primary}
                sx={{ flexBasis: "20%", textAlign: "center" }}
              >
                <Dot color={status} />
              </Box>

              <Typography
                variant="subtitle1"
                color={theme.palette.text.primary}
                sx={{ flexBasis: "20%", textAlign: "center" }}
              >
                {property}
              </Typography>
            </Box>


            <Typography variant="h3" color="#323C4D" sx={{ flexBasis: '20%', textAlign: 'center' }}>
              {property}
            </Typography>

            <StyledButton size='small' variant="contained" sx={{ flexBasis: '15%' }}>
              View Info
            </StyledButton>

            <IconButton sx={{ flexBasis: '5%' }}>
              <CheckCircleTwoTone fontSize='medium' color='grey' />
            </IconButton>

          </>
        )}
      </Box >
    </StyledDashboardCard>
  );
};
const TableHeader = () => {
  const theme = useTheme();
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
        color={theme.palette.text.primary}
        sx={{ flexBasis: "75%", textAlign: "left" }}
      ></Typography>

      <Typography
        variant="h6"
        color={theme.palette.text.primary}
        sx={{ flexBasis: "20%", textAlign: "center" }}
      >
        Status
      </Typography>

      <Typography
        variant="h6"
        color={theme.palette.text.primary}
        sx={{ flexBasis: "20%", textAlign: "center" }}
      >
        Property
      </Typography>
      <Box sx={{ flexBasis: "11%" }} />
      <Typography
        variant="h6"
        color={theme.palette.text.primary}
        sx={{ flexBasis: "10%", textAlign: "center" }}
      >
        Action
      </Typography>
      <Box sx={{ flexBasis: "3%" }} />
    </Box>
  );
};

const TaskTable = ({ tableData, loading }) => {
  return (
    <Stack sx={{ mt: 1 }}>
      <TableHeader />
      <Box sx={{ overflow: "auto", height: "15rem", p: 2 }}>
        <Stack rowGap={1.5}>
          {!loading ? (
            <>
              {tableData?.length > 0 ? (
                <>
                  {tableData?.map((row, index) => {
                    const status = getStatus(row?.status);
                    return (
                      <ColorRow
                        key={row?.index}
                        title={row?.description}
                        status={status}
                        property={row?.property}
                        bgcolor={
                          row?.status === "COMPLETED"
                            ? "grey.300"
                            : `error.lighter`
                        }
                        borderRadius={"15px"}
                      />
                    );
                  })}
                </>
              ) : (
                <NoDataMessage />
              )}
            </>
          ) : (
            <AppSkeleton
              row={3}
              variant={"custom"}
              width={"100%"}
              height={"60px"}
            />
          )}
        </Stack>
      </Box >
    </Stack >
  );
};

export default TaskTable;
