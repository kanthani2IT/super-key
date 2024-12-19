// material-ui
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// project import
import MainCard from "components/MainCard";

// assets
import AppGrid from "components/AppComponents/AppGrid";
import AppSkeletonWrapper from "components/AppComponents/AppSkeletonWrapper";
import MainTabs from "components/MainTabs";
import {
  useGetActiveAndCompletedTaskByFilter,
  useGetDashboardMetrics,
} from "hooks/useDashboard";
import {
  useMarkTaskAsCompleted,
  useVerunaPriorityQuery,
  useVerunaUsersQuery,
} from "hooks/useDropDown";
import { ColorBox } from "pages/component-overview/color";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { transformedRenewalData } from "utils/helpers";
import RenewalPieChart from "./RenewalPieChart";
import TaskTableDashBoard from "./TaskTableDashBoard";

// ==============================|| DASHBOARD - DEFAULT ||============================== //
const tabs = [
  { label: "Active Task", value: "active" },
  { label: "Completed", value: "completed" },
];

export default function DashboardDefault() {
  const { data: assigneToData, isLoading: assigneToLoading } =
    useVerunaUsersQuery();

  const [selectedTab, setSelectedTab] = useState(tabs[0].value);
  const [page, setPage] = useState(1);

  const { data: priorityData } = useVerunaPriorityQuery();
  const filterColumns = [
    {
      label: "Assigned to",
      data: assigneToData,
      checked: true,
    },
    {
      label: "Priority",

      data: priorityData,
      checked: false,
    },
  ];

  const initialTab = Object.keys(filterColumns)[0] || "Assigned to";
  const [selectedFilter, setSelectedFilter] = useState(initialTab);
  const [open, setOpen] = useState(false);
  const [filterData, setFilterData] = useState("equal");
  const navigate = useNavigate();
  //Todo Users
  // const { data, isLoading } = useGetUsers();
  const { data: dashboardData, isLoading: isWidgetLoading } =
    useGetDashboardMetrics();
  const {
    insuredCommunities,
    totalCommunities,
    totalCoverageValue,
    totalPremium,
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
  useEffect(() => {
    fetchTaskData();
    if (filterColumns?.length > 0) {
      setSelectedFilter(0);
    }
  }, [page, filterData]);
  console.log(filterData, "filterDara");
  const fetchTaskData = () => {
    const dataFilters = Array.isArray(filterData)
      ? filterData.map((value) => ({
          column: selectedFilter === 0 ? "assignedTo" : "priority",
          operator: "equals",
          value: value,
        }))
      : [];

    let reqBody = {
      sort: "createdAt",
      orderBy: "desc",
      page: page,
      size: 10,
      data: dataFilters,
    };
    fetchActiveAndCompletedTaskByFilter(reqBody);
  };

  const fetchData = (status) => {
    let reqBody = {
      sort: "createdAt",
      orderBy: "desc",
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
  const successHandler = () => {
    fetchActiveAndCompletedTaskByFilter();
  };
  const handleTaskCompletion = (taskPayload) => {
    updateTaskComplete({
      id: taskPayload.taskId,
    });
  };
  const { mutate: updateTaskComplete, isLoading: isCompleting } =
    useMarkTaskAsCompleted(successHandler);
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
              <RenewalPieChart
                chartData={transformedRenewalData(upcomingRenewals) ?? []}
              />
            </AppGrid>
          </MainCard>
        </AppSkeletonWrapper>
      </AppGrid>
      {/* {Todo Users} */}
      {/* <AppModal open={open} onClose={handleClose} height="auto" width="70%">
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
      </AppModal> */}
      <AppGrid size={{ xs: 12 }}>
        <MainCard
          title={"Task Assigned"}
          secondary={"Full View"}
          isFilter
          showSecondary={false}
          secondaryAction={() => navigate("/tasks")}
          setFilterData={setFilterData}
          filterColumns={filterColumns}
          selectedTab={selectedFilter}
          setSelectedTab={setSelectedFilter}
        >
          <MainTabs
            handleChange={handleChange}
            value={selectedTab}
            tabs={tabs}
          />
          <TaskTableDashBoard
            tableData={taskData?.data?.content || []}
            loading={isTaskLoading}
            selectedTab={selectedTab}
            payload={handleTaskCompletion}
          ></TaskTableDashBoard>
        </MainCard>
      </AppGrid>
    </AppGrid>
  );
}
