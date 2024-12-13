import AppGrid from "components/AppComponents/AppGrid";
import { ButtonGroup, RadiusStyledButton } from "components/StyledComponents";
import { useGetActiveAndCompletedTaskByFilter } from "hooks/useDashboard";
import { useEffect } from "react";
import TaskTable from "./TaskTable";
import TaskCreation from "./create";

const Task = () => {
  const {
    data: taskData,
    mutate: fetchActiveAndCompletedTaskByFilter,
    isLoading: isTaskLoading,
  } = useGetActiveAndCompletedTaskByFilter();
  useEffect(() => {
    let reqBody = {
      sort: "createdAt",
      orderBy: "desc",
      id: "34678098765",
      data: [
        {
          column: "status",
          operator: "contains",
          value: "",
        },
      ],
    };
    let communityId = "4567890-";
    fetchActiveAndCompletedTaskByFilter(reqBody, communityId);
  }, []);

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
        <TaskTable height={"80vh"} taskList={taskData?.data} />
      </AppGrid>
    </AppGrid>
  );
};

export default Task;
