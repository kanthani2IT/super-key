// material-ui
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// project import
import MainCard from "components/MainCard";

// assets
import AppGrid from "components/AppComponents/AppGrid";
import AppModal from "components/AppComponents/AppModal";
import MainTabs from "components/MainTabs";
import { useGetActiveTask, useGetCompletedTask } from "hooks/useDashboard";
import { useGetUsers } from "hooks/useOnboard";
import { ColorBox } from "pages/component-overview/color";
import { useState } from "react";
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
  const isActiveTab = selectedTab === "active";
  const { data, isLoading } = useGetUsers();
  const { data: activeTaskList, isLoading: isActiveLoading } =
    useGetActiveTask();
  const { data: completedTaskList, isLoading: isCompletedLoading } =
    useGetCompletedTask();

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const handleClose = () => {
    setOpen(false);
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
          </AppGrid>
          <AppGrid size={{ xs: 12, md: 4, lg: 4 }}>
            <MainCard>
              <Stack rowGap={4} textAlign={"center"}>
                <Typography variant="h6">
                  Communities
                  <br /> Insured
                </Typography>
                <Typography variant="subtitle2" color="success">
                  30 of 40
                </Typography>
              </Stack>
            </MainCard>
          </AppGrid>
          <AppGrid size={{ xs: 12, md: 4, lg: 4 }}>
            <MainCard>
              <Stack rowGap={4} textAlign={"center"}>
                <Typography variant="h6">
                  Insurance <br /> Worth
                </Typography>
                <Typography variant="subtitle2" color="success">
                  $10,000,000
                </Typography>
              </Stack>
            </MainCard>
          </AppGrid>
          <AppGrid size={{ xs: 12, md: 4, lg: 4 }}>
            <MainCard>
              <Stack rowGap={4} textAlign={"center"}>
                <Typography variant="h6">
                  Maintenance
                  <br /> Pending
                </Typography>
                <Typography variant="subtitle2" color="success">
                  2
                </Typography>
              </Stack>
            </MainCard>
          </AppGrid>
        </AppGrid>
      </AppGrid>
      <AppGrid size={{ xs: 12, md: 6, lg: 6 }}>
        <MainCard title={"Upcoming Renewals"}>
          <AppGrid size={{ xs: 12 }} justifyItems={"center"}>
            <RenewalPieChart />
          </AppGrid>
        </MainCard>
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
        <MainCard title={"Task Assigned"} secondary={"Full View"} isFilter>
          <MainTabs
            handleChange={handleChange}
            value={selectedTab}
            tabs={tabs}
          />
          <TaskTable
            tableData={
              isActiveTab ? activeTaskList?.data : completedTaskList?.data
            }
            loading={isActiveTab ? isActiveLoading : isCompletedLoading}
          />
        </MainCard>
      </AppGrid>
    </AppGrid>
  );
}
