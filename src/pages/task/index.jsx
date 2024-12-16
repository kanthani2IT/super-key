import AppGrid from "components/AppComponents/AppGrid";
import { ButtonGroup, RadiusStyledButton } from "components/StyledComponents";
import { useGetActiveAndCompletedTaskByFilter } from "hooks/useDashboard";
import { useEffect, useState } from "react";
import TaskTable from "./TaskTable";
import TaskCreation from "./create";

const Task = () => {
  const [page, setPage] = useState(1);
  const {
    data: taskData,
    mutate: fetchActiveAndCompletedTaskByFilter,
    isLoading: isTaskLoading,
  } = useGetActiveAndCompletedTaskByFilter();

  useEffect(() => {
    let reqBody = {
      sort: "createdAt",
      orderBy: "desc",
      id: "0017x00000kF1kTAAS",
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
  }, [page]);
  const handleChangePage = (event, newPage) => {
    //fetchActiveAndCompletedTaskByFilter(reqBody);
    // fetchData(filters.sort, filters.search, newPage);
    setPage(newPage);
    // setFilters({ ...filters, page: newPage })
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
          <RadiusStyledButton variant="contained">Over Due</RadiusStyledButton>
        </ButtonGroup>
        <ButtonGroup>
          <TaskCreation />
        </ButtonGroup>
      </AppGrid>
      <AppGrid item size={{ xs: 12 }}>
        <TaskTable
          height={"80vh"}
          taskList={taskData?.data}
          handleChangePage={handleChangePage}
          page={page}
        />
      </AppGrid>
    </AppGrid>
  );
};

export default Task;
