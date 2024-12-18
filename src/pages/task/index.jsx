import AppGrid from "components/AppComponents/AppGrid";
import { ButtonGroup, RadiusStyledButton } from "components/StyledComponents";
import { useGetActiveAndCompletedTaskByFilter } from "hooks/useDashboard";
import { useVerunaPriorityQuery, useVerunaUsersQuery } from "hooks/useDropDown";
import { useEffect, useState } from "react";
import TaskTable from "./TaskTable";
import TaskCreation from "./create";
//Need to check
const Task = () => {
  const [page, setPage] = useState(1);
  const [filterData, setFilterData] = useState("");
  const {
    data: taskData,
    mutate: fetchActiveAndCompletedTaskByFilter,
    isLoading: isTaskLoading,
  } = useGetActiveAndCompletedTaskByFilter();
  const { data: assigneToData, isLoading: assigneToLoading } =
    useVerunaUsersQuery();
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
  const initialTab = Object.keys(filterColumns)[0];
  const [selectedTab, setSelectedTab] = useState(initialTab);
  const [status, setStatus] = useState("active");

  useEffect(() => {
    fetchTaskData();
  }, [page, filterData, status]);
  console.log(selectedTab, "selectedTab");
  const fetchTaskData = () => {
    let dataFilters = [
      {
        column: "status",
        operator: "contains",
        value: status,
      },
    ];

    if (Array.isArray(filterData) && filterData.length > 0) {
      const additionalFilters = filterData.map((value) => ({
        column: selectedTab == 0 ? "assignedTo" : "priority",
        operator: "equals",
        value: value,
      }));
      dataFilters = [...dataFilters, ...additionalFilters];
    }

    let reqBody = {
      sort: "createdAt",
      orderBy: "desc",
      page: page,
      size: 10,
      data: dataFilters,
    };
    fetchActiveAndCompletedTaskByFilter(reqBody);
  };
  {
    console.log(selectedTab, "tab");
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleToggleStatus = (newStatus) => {
    setStatus(newStatus);
    setFilterData([]);
    setPage(1);
  };
  console.log(status, "status");
  return (
    <AppGrid container spacing={4}>
      <AppGrid
        item
        size={{ xs: 12 }}
        container
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <ButtonGroup>
          <RadiusStyledButton
            variant="contained"
            onClick={() => handleToggleStatus("active")}
            color={status === "completed" ? "#FFFFFF" : "green"}
            textColor={status === "completed" ? "#7B828F" : "#E9E9E9"}
          >
            Created
          </RadiusStyledButton>
          <RadiusStyledButton
            variant="contained"
            onClick={() => handleToggleStatus("completed")}
            color={status === "active" ? "#FFFFFF" : "green"}
            textColor={status === "active" ? "#7B828F" : "#E9E9E9"}
          >
            Completed
          </RadiusStyledButton>
          {/* <RadiusStyledButton variant="contained">Over Due</RadiusStyledButton> */}
        </ButtonGroup>
        <ButtonGroup>
          <TaskCreation refetch={fetchTaskData} />
        </ButtonGroup>
      </AppGrid>
      <AppGrid item size={{ xs: 12 }}>
        <TaskTable
          isLoading={isTaskLoading}
          height={"80vh"}
          taskList={taskData?.data}
          handleChangePage={handleChangePage}
          page={page}
          setPage={setPage}
          setFilterData={setFilterData}
          filterColumns={filterColumns}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      </AppGrid>
    </AppGrid>
  );
};

export default Task;
