import { useQuery } from "@tanstack/react-query";
import { api } from "api";

// Custom hook for Locations Query
export const useLocationsQuery = (input) =>
  useQuery({
    queryKey: ["allLocationList", input],
    queryFn: () => api.common.getAllLocation({ input }),
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
    queryKey: ["allDocumentsMangers", search],
    queryFn: () => api.common.getAllDocTypes({ search }),
    keepPreviousData: true,
    onSuccess: (data) => {},
    onError: (error) => {
      console.error("Error fetching documents:", error);
    },
  });
