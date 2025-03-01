import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MessageIcon from "assets/images/dashboard/MessageIcon";
import Dot from "components/@extended/Dot";
import AppSkeleton from "components/AppComponents/AppSkeleton";
import NoDataMessage from "components/NoDataMessage";
import { StyledDashboardCard } from "components/StyledComponents";

const getStatus = (status) => {
  let color;
  switch (status) {
    case "COMPLETED":
      color = "success";
      break;
    case "Not Started":
      color = "error";
      break;
    default:
      color = "warning";
  }

  return color;
};

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
                sx={{ flexBasis: "15%", textAlign: "center" }}
              >
                <Dot color={status} />
              </Box>

              <Typography
                variant="subtitle1"
                color={theme.palette.text.primary}
                sx={{ flexBasis: "21%", textAlign: "center" }}
              >
                -
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
        sx={{ flexBasis: "85%", textAlign: "left" }}
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
                          row?.status == "In Progress"
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
      </Box>
    </Stack>
  );
};

export default TaskTable;
