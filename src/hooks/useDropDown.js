import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "api";
import { useSnackbar } from "components/AppComponents/SnackBarProvider";
import { MESSAGE, SEVERITY } from "utils/message";

// Custom hook for Locations Query
export const useLocationsQuery = (input) =>
  useQuery({
    queryKey: ["allLocationList", input],
    queryFn: () => api.common.getAllLocation({ input, sessionToken: 12345678 }),
    keepPreviousData: true,
    onSuccess: (data) => {},
    onError: (error) => {
      console.error("Error fetching locations:", error);
    },
  });

// Custom hook for Communities Query
export const useCommunitiesQuery = (search) =>
  useQuery({
    queryKey: ["allCommunities", search],
    queryFn: () => api.common.getAllCommunity({ search }),
    keepPreviousData: true,
    onSuccess: (data) => {},
    onError: (error) => {
      console.error("Error fetching communities:", error);
    },
  });

// Custom hook for Community Managers Query
export const useCommunityManagersQuery = (search) =>
  useQuery({
    queryKey: ["allCommunityMangers", search],
    queryFn: () => api.common.getAllCommunityManager({ search }),
    keepPreviousData: true,
    onSuccess: (data) => {},
    onError: (error) => {
      console.error("Error fetching community managers:", error);
    },
  });

// Custom hook for Property Managers Query
export const usePropertyManagersQuery = (search) =>
  useQuery({
    queryKey: ["allPropertyMangers", search],
    queryFn: () => api.common.getAllPropertyManager({ search }),
    keepPreviousData: true,
    onSuccess: (data) => {},
    onError: (error) => {
      console.error("Error fetching property managers:", error);
    },
  });

// Custom hook for Document Type Query
export const useDocumentsQuery = (search) =>
  useQuery({
    queryKey: ["allDocuments", search],
    queryFn: () => api.common.getAllDocTypes({ search }),
    keepPreviousData: true,
    onSuccess: (data) => {},
    onError: (error) => {
      console.error("Error fetching documents:", error);
    },
  });

// Custom hook for Status Query
export const useTaskStatusQuery = (search) =>
  useQuery({
    queryKey: ["allTaskStatus", search],
    queryFn: () => api.task.getAllStatus({ search }),
    keepPreviousData: true,
    select: (data) => {
      return data?.data || [];
    },
    onSuccess: (data) => {},
    onError: (error) => {
      console.error("Error fetching status:", error);
    },
  });

// Custom hook for Types Query
export const useTaskTypesQuery = (search) =>
  useQuery({
    queryKey: ["allTaskTypes", search],
    queryFn: () => api.task.getAllTypes({ search }),
    keepPreviousData: true,
    select: (data) => {
      return data?.data || [];
    },
    onSuccess: (data) => {},
    onError: (error) => {
      console.error("Error fetching types:", error);
    },
  });

// Custom hook for Priorities Query
export const useTaskPrioritiesQuery = (search) =>
  useQuery({
    queryKey: ["allTaskPriority", search],
    queryFn: () => api.task.getAllPriorities({ search }),
    keepPreviousData: true,
    select: (data) => {
      return data?.data || [];
    },
    onSuccess: (data) => {},
    onError: (error) => {
      console.error("Error fetching types:", error);
    },
  });

// Custom hook for Contacts Query
export const useTaskContactsQuery = (search) =>
  useQuery({
    queryKey: ["allTaskContacts", search],
    queryFn: () => api.task.getAllTypes({ search }),
    keepPreviousData: true,
    select: (data) => {
      return data?.data?.data || [];
    },
    onSuccess: (data) => {},
    onError: (error) => {
      console.error("Error fetching types:", error);
    },
  });

// Custom hook for users Query
export const useVerunaUsersQuery = (search) =>
  useQuery({
    queryKey: ["allVerunaUsers", search],
    queryFn: () => api.common.getAllVerunaUsers({ search }),
    keepPreviousData: true,
    select: (data) => {
      return data?.data?.records || [];
    },
    onSuccess: (data) => {},
    onError: (error) => {
      console.error("Error fetching types:", error);
    },
  });

// Custom hook for Priorities Query
export const useVerunaPriorityQuery = (search) =>
  useQuery({
    queryKey: ["allVerunaPriority", search],
    queryFn: () => api.common.getAllVerunaPriority({ search }),
    keepPreviousData: true,
    select: (data) => {
      return data?.data || [];
    },
    onSuccess: (data) => {},
    onError: (error) => {
      console.error("Error fetching types:", error);
    },
  });

// Mark Task as Completed
export const useMarkTaskAsCompleted = (successHandler) => {
  const { updateSnackbar } = useSnackbar();
  const mutation = useMutation({
    mutationKey: ["markTaskCompletedById"],
    mutationFn: ({ id }) => api.task.markTaskCompletedById(id),
    onSuccess: (data) => {
      successHandler?.();
      updateSnackbar({
        message: MESSAGE.markTaskCompletedSuccess,
        severity: SEVERITY.success,
      });
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.token || "An error occurred.";
      console.error("Mutation error:", errorMessage);
      updateSnackbar({
        message: errorMessage,
        severity: SEVERITY.error,
      });
    },
  });
  return mutation;
};
