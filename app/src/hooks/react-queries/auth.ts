import { useQuery, useMutation } from "@tanstack/react-query";
import { getMeAPI, loginAPI, loginWithOTPAPI, registerAPI, logoutAPI } from "@/api/auth";

export function useProfile(data?: any) {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getMeAPI,
    initialData: data
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: loginAPI,
  });
}

export function useLoginWithOTP() {
  return useMutation({
    mutationFn: loginWithOTPAPI,
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: registerAPI,
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: logoutAPI,
  });
}
