import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "api";
import { useSnackbar } from "components/AppComponents/SnackBarProvider";
import { MESSAGE, SEVERITY } from "utils/message";

export const useGetUsers = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["login"],
    queryFn: api.onboard.getUsersData,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  // Return the necessary states: data, isLoading, isError, error
  return { data, isLoading, isError, error };
};

export const useGetUserById = (id) => {
  console.log("Received id:", id);

  return useQuery(["userInfo", id], () => api.onboard.getUserById(id), {
    keepPreviousData: true,
    onSuccess: (data) => {
      console.log("User data:", data);
    },
    onError: (error) => {
      console.error("Error fetching user data:", error);
    },
  });
};

export const useUpdateUserById = () =>
  useMutation({
    mutationKey: ["updateUserById"],
    mutationFn: ({ id, body }) => api.onboard.updateUserById(id, body),
    onSuccess: (data) => {
      console.log(data, "data");
    },
    onError: (error) => {
      console.error(error);
    },
  });
export const useDeleteUserById = () =>
  useMutation({
    mutationKey: ["deleteUserById"],
    mutationFn: ({ id, body }) => api.onboard.deleteUserById(id, body),
    onSuccess: (data) => {
      console.log(data, "data");
    },
    onError: (error) => {
      console.error(error);
    },
  });
// Return the necessary states: data, isLoading, isError, error

export const useOnboardCommunity = (successHandler) => {
  const { updateSnackbar } = useSnackbar();
  const mutation = useMutation({
    mutationKey: ["community-onboarding"],
    mutationFn: (payload) => api.onboard.createCommunity(payload),
    onSuccess: (data) => {
      console.log("Mutation successful:", data);
      successHandler?.();
      updateSnackbar({
        message: MESSAGE.communityOnboardedSuccess,
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
      successHandler?.();
    },
  });

  return mutation;
};

// export const useLoginUser = () => {
//   const navigate = useNavigate();
//   const {setAuthCookie}=useAuthCookies()
//   const { updateSnackbar } = useSnackbar();  // Get the updateSnackbar function

//   const {mutate,isSuccess, isError,error}= useMutation({
//     mutationKey: ["login"],
//     mutationFn: (credentialData) => api.login.userLogin(credentialData), // Pass `credentialData` to `mutate`
//     onSuccess: (response) => {
//       setAuthCookie("token", response.data.token)
//       navigate('/home');
//       updateSnackbar({
//         message:MESSAGE.loginSuccess,
//         severity:SEVERITY.success
//       });
//     },
//     onError: (error) => {
//       updateSnackbar({
//         message:error.response.data.token,
//         severity:SEVERITY.error
//       });
//       console.error(error);
//     },

//   });
//   const message=isSuccess?MESSAGE.loginSuccess:error?.response?.data?.token
//   return {mutate,isSuccess,isError,message}
// };
