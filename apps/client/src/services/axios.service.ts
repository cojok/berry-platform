import { HTTP_STATUS_CODES } from '@berry/shared';
import axios, { AxiosError, AxiosInstance } from 'axios';

const accessToken: string | null = localStorage.getItem('accessToken');
export const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    ...(accessToken !== null && { Authorization: `Bearer ${accessToken}` }),
  },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const checkUnauthorized = (error: AxiosError, redirectUrl?: string): void => {
  if (error.response?.status === HTTP_STATUS_CODES.UNAUTHORIZED) {
    localStorage.removeItem('accessToken');
    let redirectTo = redirectUrl;
    if (redirectTo === undefined) {
      redirectTo = window.location.pathname;
    }
    window.location.href = `/login?redirectTo=${redirectTo}`;
  }
};
