import AppGrid from "components/AppComponents/AppGrid";
import { ButtonGroup, RadiusStyledButton } from "components/StyledComponents";
import { useGetActiveAndCompletedTaskByFilter } from "hooks/useDashboard";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    fetchTaskData();
  }, [page]);

  const fetchTaskData = () => {
    let reqBody = {
      sort: "createdAt",
      orderBy: "desc",
      id: "34678098765",
      page: page,
      size: 10,
      data: [
        {
          column: "status",
          operator: "contains",
          value: "",
        },
      ],
    };

    fetchActiveAndCompletedTaskByFilter(reqBody);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
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
        />
      </AppGrid>
    </AppGrid>
  );
};

export default Task;
