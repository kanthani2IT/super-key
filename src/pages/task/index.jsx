import AppGrid from "components/AppComponents/AppGrid";
import { ButtonGroup, RadiusStyledButton } from "components/StyledComponents";
import { useGetActiveAndCompletedTaskByFilter } from "hooks/useDashboard";
import { useVerunaPriorityQuery, useVerunaUsersQuery } from "hooks/useDropDown";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { transformData, updatePriorityType } from "utils/helpers";
import TaskTable from "./TaskTable";
import TaskCreation from "./create";
//Need to check
const Task = () => {
  const [page, setPage] = useState(1);
  const {
    data: taskData,
    mutate: fetchActiveAndCompletedTaskByFilter,
    isLoading: isTaskLoading,
  } = useGetActiveAndCompletedTaskByFilter();
  const { data: assigneToData, isLoading: assigneToLoading } =
    useVerunaUsersQuery();
  const { data: priorityData } = useVerunaPriorityQuery();
  const navigate = useNavigate();
  const location = useLocation();
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
  const searchParams = new URLSearchParams(location.search);
  const taskValue = searchParams.get("task");
  const [status, setStatus] = useState(taskValue || "active");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterData, setFilterData] = useState([
    { operator: "contains", name: status, column: "status" },
  ]);

  useEffect(() => {
    if (status && page) {
      fetchTaskData();
      navigate({
        pathname: location.pathname,
        search: `?task=${status}`,
      });
    }
  }, [filterData, status]);

  const fetchTaskData = () => {
    let reqBody = {
      sort: "createdAt",
      orderBy: "desc",
      page: filterData > 1 ? page : 1,
      size: 1000,
      data: transformData(filterData),
    };
    fetchActiveAndCompletedTaskByFilter(reqBody);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleToggleStatus = (newStatus) => {
    setStatus(newStatus);
    setSearchTerm("");
    setFilterData(updatePriorityType(filterData, newStatus));
    setPage(1);
  };
  const handleSearch = (newValue) => {
    setSearchTerm(newValue);
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
          filterData={filterData}
          fetchTaskData={fetchTaskData}
          status={status}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
        />
      </AppGrid>
    </AppGrid>
  );
};

export default Task;
