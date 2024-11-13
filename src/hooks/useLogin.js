import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "api";
import { useSnackbar } from "components/styledComponents/SnackBarProvider";
import { useNavigate } from "react-router";
import { useAuthCookies } from "utils/cookie";
import { MESSAGE, SEVERITY } from "utils/message";

export const useGetQuery = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["login"],
    queryFn: api.login.getUserData,
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

export const useLoginUser = () => {
  const navigate = useNavigate();
  const { setAuthCookie } = useAuthCookies();
  const { updateSnackbar } = useSnackbar(); // Get the updateSnackbar function

  const { mutate, isSuccess, isError, error } = useMutation({
    mutationKey: ["login"],
    mutationFn: (credentialData) => api.login.userLogin(credentialData), // Pass `credentialData` to `mutate`
    onSuccess: (response) => {
      setAuthCookie("token", response.data.token);
      navigate("/home");
      updateSnackbar({
        message: MESSAGE.loginSuccess,
        severity: SEVERITY.success,
      });
    },
    onError: (error) => {
      updateSnackbar({
        message: error.response.data.token,
        severity: SEVERITY.error,
      });
      console.error(error);
    },
  });
  const message = isSuccess
    ? MESSAGE.loginSuccess
    : error?.response?.data?.token;
  return { mutate, isSuccess, isError, message };
};

export const useRequestReset = () => {
  const { updateSnackbar } = useSnackbar(); // Get the updateSnackbar function
  const { mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: (mailId) => api.login.requestReset(mailId), // Pass `credentialData` to `mutate`
    onSuccess: (data) => {
      navigate("/login");
      updateSnackbar({
        message: data.data.token,
        severity: SEVERITY.success,
      });
    },
    onError: (error) => {
      //Todo: After enabling the email have to uncomment this code
      // updateSnackbar({
      //   message:error.response.data.token,
      //   severity:SEVERITY.error
      // });
      console.error(error);
    },
  });
  return { mutate };
};

export const useResetPassword = () => {
  const navigate = useNavigate();
  const { updateSnackbar } = useSnackbar(); // Get the updateSnackbar function
  const { mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: (resetData) => api.login.resetPassword(resetData), // Pass `credentialData` to `mutate`
    onSuccess: (data) => {
      navigate("/login");
      updateSnackbar({
        message: data.data.token,
        severity: SEVERITY.success,
      });
    },
    onError: (error) => {
      updateSnackbar({
        message: error.response.data.token,
        severity: SEVERITY.error,
      });
    },
  });
  return { mutate };
};

export const useNewPassword = () => {
  const navigate = useNavigate();
  const { updateSnackbar } = useSnackbar(); // Get the updateSnackbar function
  const { mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: (newPasswordData) => api.login.newPassword(newPasswordData), // Pass `credentialData` to `mutate`
    onSuccess: (data) => {
      navigate("/login");
      updateSnackbar({
        message: data.data.token,
        severity: SEVERITY.success,
      });
    },
    onError: (error) => {
      updateSnackbar({
        message: error.response.data.token || "Something went wrong",
        severity: SEVERITY.error,
      });
    },
  });
  return { mutate };
};

export const useIsEmailEnabled = ({ setNext }) => {
  const navigate = useNavigate();
  const { setAuthCookie, removeAuthCookie } = useAuthCookies();
  const { updateSnackbar } = useSnackbar(); // Get the updateSnackbar function
  const { mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: (emailEnabled) => api.login.isEmailEnabled(emailEnabled), // Pass `credentialData` to `mutate`
    onSuccess: (data) => {
      if (data.data.enabled) {
        setNext(true);
      } else {
        navigate("/changePassword/reset", { state: data.data });
        setNext("Email page");
      }
      setAuthCookie("user", data.data);
    },
    onError: (error) => {
      setNext(false);
      updateSnackbar({
        message: error.response.data.email,
        severity: SEVERITY.error,
      });
      removeAuthCookie("user");
    },
  });
  return { mutate };
};
