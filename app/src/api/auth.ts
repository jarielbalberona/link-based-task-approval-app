import axiosInstance from './axios-instance';

export const getMeAPI = async (_queryContext?: any, headers?: any): Promise<any> => {
  const { data } = await axiosInstance.get('/auth/me', { headers });
  return data.data || null;
};

export const verifySessionAPI = async (_queryContext?: any, headers?: any): Promise<any> => {
  const { data } = await axiosInstance.get('/auth/session', { headers });
  return data.data || null;
};

export const checkAccountVerificationAPI = async (_queryContext?: any, headers?: any): Promise<any> => {
  const { data } = await axiosInstance.get('/auth/account-verification', { headers });
  return data.data || null;
};

export const loginAPI = async (credentials: { username: string; password: string }): Promise<any> => {
  const { data } = await axiosInstance.post('/auth/login', credentials);
  return data.data || null;
};

export const loginWithOTPAPI = async (credentials: { username: string; password: string; otp: string }): Promise<any> => {
  const { data } = await axiosInstance.post('/auth/login/otp', credentials);
  return data.data || null;
};

export const registerAPI = async (userData: any): Promise<any> => {
  const { data } = await axiosInstance.post('/auth/register', userData);
  return data.data || null;
};

export const logoutAPI = async (): Promise<any> => {
  const { data } = await axiosInstance.post('/auth/logout');
  return data.data || null;
};
