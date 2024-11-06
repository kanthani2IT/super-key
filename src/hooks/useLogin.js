import { useQuery } from "@tanstack/react-query";
import { api } from "api";

export const useGetQuery = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["login"], // The queryKey should be an array containing the URL
    queryFn: api.login.getUserData, // The query function (getData)
    onSuccess: (data) => {
      console.log(data); // Handle success
    },
    onError: (error) => {
      console.error(error); // Handle error
    },
  });

  // Return the necessary states: data, isLoading, isError, error
  return { data, isLoading, isError, error };
};
