// axios
import axios, { InternalAxiosRequestConfig } from 'axios';
import { useStorage } from '@vueuse/core';

const instance = axios.create({
  baseURL: `http://localhost:8000`,
});

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = useStorage('token', '');
  if (config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
