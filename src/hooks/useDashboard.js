import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "api";

export const useGetActiveTask = () => {
  return useQuery({
    queryKey: ["activeTask"],
    queryFn: api.dashboard.getActiveTask,
  });
};

export const useGetCompletedTask = () => {
  return useQuery({
    queryKey: ["completedTask"],
    queryFn: api.dashboard.getCompletedTask,
  });
};

export const useGetActiveAndCompletedTaskByFilter = () => {
  return useMutation({
    mutationFn: (body) => api.dashboard.getActiveAndCompletedTaskByFilter(body),
  });
};
