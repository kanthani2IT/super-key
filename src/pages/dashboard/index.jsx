// material-ui
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// project import
import MainCard from "components/MainCard";

// assets
import AppGrid from "components/AppComponents/AppGrid";
import AppModal from "components/AppComponents/AppModal";
import AppSkeleton from "components/AppComponents/AppSkeleton";
import MainTabs from "components/MainTabs";
import {
  useGetActiveAndCompletedTaskByFilter,
  useGetDashboardMetrics,
} from "hooks/useDashboard";
import { useGetUsers } from "hooks/useOnboard";
import { ColorBox } from "pages/component-overview/color";
import { useEffect, useState } from "react";
import RenewalPieChart from "./RenewalPieChart";
import TaskTable from "./TaskTable";
import UserTable from "./UserTable";

// ==============================|| DASHBOARD - DEFAULT ||============================== //
const tabs = [
  { label: "Active Task", value: "active" },
  { label: "Completed", value: "completed" },
];

export default function DashboardDefault() {
  const [selectedTab, setSelectedTab] = useState(tabs[0].value);
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useGetUsers();
  const { data: dashboardData, isLoading: isWidgetLoading } =
    useGetDashboardMetrics();
  const {
    insuredCommunities,
    totalCommunities,
    totalCoverageValue,
    upcomingRenewals,
  } = dashboardData?.data ?? {};

  const {
    data: taskData,
    mutate: fetchActiveAndCompletedTaskByFilter,
    isLoading: isTaskLoading,
  } = useGetActiveAndCompletedTaskByFilter();

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
    fetchData(newValue);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = (status) => {
    let reqBody = {
      sort: "createdAt",
      orderBy: "desc",
      data: [
        {
          column: "status",
          operator: "contains",
          value: status ?? selectedTab,
        },
      ],
    };
    fetchActiveAndCompletedTaskByFilter(reqBody);
  };

  return (
    <AppGrid container rowSpacing={3} columnSpacing={2}>
      <AppGrid size={{ xs: 12 }}>
        <MainCard
          title="Alerts"
          secondary={"Full View"}
          sx={{
            mt: 2,
          }}
          contentSX={{ maxHeight: "9rem" }}
        >
          <Stack rowGap={2}>
            <ColorBox
              bgcolor="error.lighter"
              title="Rose Dale s Boiler room coverage is expiring on 25 th October due to non payment of new quote."
              duration="1hr"
              dark
            />
            <ColorBox
              bgcolor="grey.300"
              title="2 Assets in GRT Layout are not covered yet. Cost impact is $60,000"
              duration="2hr ago"
              dark
            />
          </Stack>
        </MainCard>
      </AppGrid>
      <AppGrid size={{ xs: 12, md: 6, lg: 6 }}>
        <AppGrid container rowSpacing={2} columnSpacing={2}>
          <AppGrid size={{ xs: 12 }}>
            {!isLoading ? (
              <MainCard
                title="Communities"
                secondary={"Full View"}
                secondaryAction={() => setOpen(true)}
              >
                <Stack spacing={2}>
                  <Typography variant="h6">Community Users</Typography>
                  <Typography variant="subtitle2" color="success">
                    {data?.data?.totalSize ?? data?.data?.length ?? 0}
                  </Typography>
                </Stack>
              </MainCard>
            ) : (
              <AppSkeleton
                row={1}
                variant={"custom"}
                width={"100%"}
                height={"200px"}
              />
            )}
          </AppGrid>
          <AppGrid size={{ xs: 12, md: 4, lg: 4 }}>
            {!isWidgetLoading ? (
              <MainCard>
                <Stack rowGap={4} textAlign={"center"}>
                  <Typography variant="h6">
                    Communities
                    <br /> Insured
                  </Typography>
                  <Typography variant="subtitle2" color="success">
                    {insuredCommunities ?? 0}
                  </Typography>
                </Stack>
              </MainCard>
            ) : (
              <AppSkeleton
                row={1}
                variant={"custom"}
                width={"100%"}
                height={"150px"}
              />
            )}
          </AppGrid>
          <AppGrid size={{ xs: 12, md: 4, lg: 4 }}>
            {!isWidgetLoading ? (
              <MainCard>
                <Stack rowGap={4} textAlign={"center"}>
                  <Typography variant="h6">
                    Insurance <br /> Worth
                  </Typography>
                  <Typography variant="subtitle2" color="success">
                    {totalCoverageValue ?? 0}
                  </Typography>
                </Stack>
              </MainCard>
            ) : (
              <AppSkeleton
                row={1}
                variant={"custom"}
                width={"100%"}
                height={"150px"}
              />
            )}
          </AppGrid>
          <AppGrid size={{ xs: 12, md: 4, lg: 4 }}>
            {!isWidgetLoading ? (
              <MainCard>
                <Stack rowGap={4} textAlign={"center"}>
                  <Typography variant="h6">
                    Maintenance
                    <br /> Pending
                  </Typography>
                  <Typography variant="subtitle2" color="success">
                    {totalCommunities ?? 0}
                  </Typography>
                </Stack>
              </MainCard>
            ) : (
              <AppSkeleton
                row={1}
                variant={"custom"}
                width={"100%"}
                height={"150px"}
              />
            )}
          </AppGrid>
        </AppGrid>
      </AppGrid>
      <AppGrid size={{ xs: 12, md: 6, lg: 6 }}>
        {!isWidgetLoading ? (
          <MainCard title={"Upcoming Renewals"}>
            <AppGrid size={{ xs: 12 }} justifyItems={"center"}>
              <RenewalPieChart chartData={upcomingRenewals ?? []} />
            </AppGrid>
          </MainCard>
        ) : (
          <AppSkeleton
            row={1}
            variant={"custom"}
            width={"100%"}
            height={"370px"}
          />
        )}
      </AppGrid>
      <AppModal open={open} onClose={handleClose} height="auto" width="70%">
        <MainCard
          noStyles={true}
          title={"Community Users"}
          count={data?.data?.totalSize ?? data?.data?.length}
        >
          <UserTable
            tableData={data?.data?.records ?? data?.data}
            isLoading={isLoading}
          />
        </MainCard>
      </AppModal>
      <AppGrid size={{ xs: 12 }}>
        <MainCard title={"Task Assigned"} secondary={"Full View"}>
          <MainTabs
            handleChange={handleChange}
            value={selectedTab}
            tabs={tabs}
          />
          <TaskTable tableData={taskData?.data || []} loading={isTaskLoading} />
        </MainCard>
      </AppGrid>
    </AppGrid>
  );
}
