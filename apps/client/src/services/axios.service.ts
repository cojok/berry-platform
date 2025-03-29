import axios, { AxiosInstance } from 'axios';

const accessToken: string | null = localStorage.getItem('access_token');
const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    ...(accessToken !== null && { Authorization: `Bearer ${accessToken}` }),
  },
});

export default instance;
