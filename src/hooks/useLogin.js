import { useMutation } from "@tanstack/react-query";
import { api } from "api";
import { useSnackbar } from "components/AppComponents/SnackBarProvider";
import { useNavigate } from "react-router";
import { useAuthCookies } from "utils/cookie";
import { MESSAGE, SEVERITY } from "utils/message";

export const useLoginUser = () => {
  const navigate = useNavigate();
  const { setAuthCookie } = useAuthCookies();
  const { updateSnackbar } = useSnackbar(); // Get the updateSnackbar function
  const { mutate, isSuccess, isError, error } = useMutation({
    mutationKey: ["login"],
    mutationFn: ({ values }) => api.login.userLogin(values), // Pass `credentialData` to `mutate`
    onSuccess: (data, { values, checked }) => {
      const userEmail = data?.data?.email;
      const cmcId =
        data?.data?.cmcAdminDTO?.managementCompanyId ?? "001bn00001CitW2AAJ";
      if (data.data.token == "Please set you own password.") {
        navigate("/reset/change", { state: { email: userEmail } });
      } else {
        setAuthCookie("token", data.data.token);
        setAuthCookie("cmcId", cmcId);
        navigate("/home");
        updateSnackbar({
          message: MESSAGE.loginSuccess,
          severity: SEVERITY.success,
        });
      }
      if (checked) {
        setAuthCookie("superkey", values);
      } else {
        setAuthCookie("superkey", { email: values.email });
      }
    },
    onError: (error) => {
      updateSnackbar({
        message: error.response.data.token,
        severity: SEVERITY.error,
      });
      setAuthCookie("superkey", { email: error.response.data.email });
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
      updateSnackbar({
        message: error.response.data,
        severity: SEVERITY.error,
      });
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
