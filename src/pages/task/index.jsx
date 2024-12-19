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
  const [filterData, setFilterData] = useState("equal");
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

  useEffect(() => {
    fetchTaskData();
  }, [page, filterData]);
  console.log(selectedTab, "filterDara");
  const fetchTaskData = () => {
    const dataFilters = Array.isArray(filterData)
      ? filterData.map((value) => ({
          column: selectedTab === 0 ? "status" : "assignedTo",
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
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const onCompleteChange = () => {
    fetchTaskData();
  };
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
        <ButtonGroup onClick={onCompleteChange}>
          <RadiusStyledButton variant="contained">Created</RadiusStyledButton>
          <RadiusStyledButton variant="contained">Completed</RadiusStyledButton>
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
