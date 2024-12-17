// material-ui
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// project import
import MainCard from "components/MainCard";

// assets
import AppGrid from "components/AppComponents/AppGrid";
import AppModal from "components/AppComponents/AppModal";
import AppSkeletonWrapper from "components/AppComponents/AppSkeletonWrapper";
import MainTabs from "components/MainTabs";
import { useGetUsers } from "hooks/useCommunity";
import {
  useGetActiveAndCompletedTaskByFilter,
  useGetDashboardMetrics,
} from "hooks/useDashboard";
import { ColorBox } from "pages/component-overview/color";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import UserTable from "../community/CommunityTable";
import RenewalPieChart from "./RenewalPieChart";
import TaskTable from "./TaskTable";
import CustomUploadTable from "components/AppComponents/CustomUploadTable";
import Columns from "./TaskTableDashBoard";
import TaskTableDashBoard from "./TaskTableDashBoard";
import { useVerunaPriorityQuery, useVerunaUsersQuery } from "hooks/useDropDown";

// ==============================|| DASHBOARD - DEFAULT ||============================== //
const tabs = [
  { label: "Active Task", value: "active" },
  { label: "Completed", value: "completed" },
];

export default function DashboardDefault() {
  const [selectedTab, setSelectedTab] = useState(tabs[0].value);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { data, isLoading } = useGetUsers();
  const { data: dashboardData, isLoading: isWidgetLoading } =
    useGetDashboardMetrics();
  const {
    insuredCommunities,
    totalCommunities,
    totalCoverageValue,
    totalPremium,
    upcomingRenewals,
  } = dashboardData?.data ?? {};
  const { data: assigneToData, isLoading: assigneToLoading } =
    useVerunaUsersQuery();
  const { data: priorityData } = useVerunaPriorityQuery();
  console.log("assigneToData", assigneToData);

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

  const [editedList, setEditedList] = React.useState([]);

  const handleChanges = (value, field, index) => {
    setEditedList((prevList) => {
      const updatedList = [...prevList];
      updatedList[index] = {
        ...updatedList[index],
        [field]: value,
      };
      return updatedList;
    });
  };

  const fetchData = (status) => {
    let reqBody = {
      sort: "createdAt",
      orderBy: "desc",
      id: "0017x00000kF1kTAAS",
      page: 1,
      size: 10,
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
            <AppSkeletonWrapper loading={isWidgetLoading} height={"200px"}>
              <MainCard
                title="Communities"
                secondary={"Full View"}
                secondaryAction={() => navigate("/community/onboarding")}
              >
                <Stack spacing={2}>
                  <Typography variant="h6">Communities Managed</Typography>
                  <Typography variant="subtitle2" color="success">
                    {totalCommunities ?? 0}
                  </Typography>
                </Stack>
              </MainCard>
            </AppSkeletonWrapper>
          </AppGrid>
          <AppGrid size={{ xs: 12, md: 4, lg: 4 }}>
            <AppSkeletonWrapper loading={isWidgetLoading} height={"150px"}>
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
            </AppSkeletonWrapper>
          </AppGrid>
          <AppGrid size={{ xs: 12, md: 4, lg: 4 }}>
            <AppSkeletonWrapper loading={isWidgetLoading} height={"150px"}>
              <MainCard>
                <Stack rowGap={4} textAlign={"center"}>
                  <Typography variant="h6">
                    Total Gross <br /> Premiums
                  </Typography>
                  <Typography variant="subtitle2" color="success">
                    {totalPremium ?? 0}
                  </Typography>
                </Stack>
              </MainCard>
            </AppSkeletonWrapper>
          </AppGrid>
          <AppGrid size={{ xs: 12, md: 4, lg: 4 }}>
            <AppSkeletonWrapper loading={isWidgetLoading} height={"150px"}>
              <MainCard>
                <Stack rowGap={4} textAlign={"center"}>
                  <Typography variant="h6">
                    Maintenance
                    <br /> Pending
                  </Typography>
                  <Typography variant="subtitle2" color="success">
                    {totalCoverageValue ?? 0}
                  </Typography>
                </Stack>
              </MainCard>
            </AppSkeletonWrapper>
          </AppGrid>
        </AppGrid>
      </AppGrid>

      <AppGrid size={{ xs: 12, md: 6, lg: 6 }}>
        <AppSkeletonWrapper loading={isWidgetLoading} height={"370px"}>
          <MainCard title={"Upcoming Renewals"}>
            <AppGrid size={{ xs: 12 }} justifyItems={"center"}>
              <RenewalPieChart chartData={upcomingRenewals ?? []} />
            </AppGrid>
          </MainCard>
        </AppSkeletonWrapper>
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
        <MainCard
          title={"Task Assigned"}
          secondary={"Full View"}
          isFilter
          showSecondary={false}
          selectedProperty={assigneToData}
          selectedPriority={priorityData}
        >
          <MainTabs
            handleChange={handleChange}
            value={selectedTab}
            tabs={tabs}
          />
          <TaskTableDashBoard
            tableData={taskData?.data || []}
            loading={isTaskLoading}
          ></TaskTableDashBoard>
        </MainCard>
      </AppGrid>
    </AppGrid>
  );
}
