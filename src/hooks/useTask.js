import { useMutation } from "@tanstack/react-query";
import { api } from "api";
import { useSnackbar } from "components/AppComponents/SnackBarProvider";
import { MESSAGE, SEVERITY } from "utils/message";

export const useTaskCreation = (successHandler) => {
  const { updateSnackbar } = useSnackbar();
  const mutation = useMutation({
    mutationKey: ["task-creation"],
    mutationFn: (payload) => api.task.createTask(payload),
    onSuccess: (data) => {
      successHandler?.();
      updateSnackbar({
        message: MESSAGE.taskCreatedSuccess,
        severity: SEVERITY.success,
      });
    },
    onError: (error) => {
      const errorMessage = error?.response?.data || "An error occurred.";
      updateSnackbar({
        message: errorMessage,
        severity: SEVERITY.error,
      });
    },
  });

  return mutation;
};
