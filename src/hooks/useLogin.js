import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "api";
import { useNavigate } from "react-router";
import { useAuthCookies } from "utils/cookie";

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
  const {setAuthCookie}=useAuthCookies()
  const {mutate}= useMutation({
    mutationKey: ["login"],
    mutationFn: (credentialData) => api.login.userLogin(credentialData), // Pass `credentialData` to `mutate`
    onSuccess: (data) => {
      setAuthCookie("token", "ASDFADFADSFASDF")
      console.log(data); 
    },
    onError: (error) => {
      setAuthCookie("token", "ASDFADFADSFASDF")
      console.error(error); 

    },
  });
  return {mutate}
};

export const useRequestReset = () => {
  
  const {mutate}= useMutation({
    mutationKey: ["login"],
    mutationFn: (mailId) => api.login.requestReset(mailId), // Pass `credentialData` to `mutate`
    onSuccess: (data) => {
      
      console.log(data); 
    },
    onError: (error) => {
      

      console.error(error); 
    },
  });
  return {mutate}
};
export const useResetPassword = () => {

  const navigate = useNavigate();

  const {mutate}= useMutation({
    mutationKey: ["login"],
    mutationFn: (resetData) => api.login.resetPassword(resetData), // Pass `credentialData` to `mutate`
    onSuccess: (data) => {
     navigate('/login');
      console.log(data); 
    },
    onError: (error) => {
      console.error(error); 
    },
  });

  return {mutate}
};

export const useNewPassword = () => {
  
  const {mutate}= useMutation({
    mutationKey: ["login"],
    mutationFn: (newPasswordData) => api.login.newPassword(newPasswordData), // Pass `credentialData` to `mutate`
    onSuccess: (data) => {
      console.log(data); 
    },
    onError: (error) => {
      console.error(error); 
    },
  });

  return {mutate}
};