import axios, { AxiosInstance } from 'axios';

const accessToken: string | null = localStorage.getItem('accessToken');
export const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    ...(accessToken !== null && { Authorization: `Bearer ${accessToken}` }),
  },
});

export const checkAuthErrorRemoveToken = (error: unknown): void => {
  if (!axios.isAxiosError(error)) return;

  if (error.response?.status === 401) {
    localStorage.removeItem('accessToken');
  }
};
