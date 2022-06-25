import axios, { AxiosInstance } from 'axios';
import env from './configs/env-config';

const axiosInstance: AxiosInstance = axios.create({
  timeout: 6000,
  baseURL: env.REACT_APP_URL,
});

axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => {
    Promise.reject(error);
  },
);

export default axiosInstance;
