import axios, { AxiosInstance } from 'axios';
import { message as $message } from 'antd';
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

axiosInstance.interceptors.response.use(
  (config) => {
    if (config?.data?.message) {
      // $message.success(config.data.message)
    }
    return config;
  },
  (error) => {
    let errorMessage = 'Oops something went wrong';
    if (error?.message?.includes('Network Error')) {
      errorMessage = 'Network error, check it out';
      $message.error(errorMessage);
    } else {
      errorMessage = error?.message;
    }
    return {
      status: error?.response?.status,
      message: error?.response?.data?.class ? error.response.data.class : errorMessage,
    };
  },
);

export default axiosInstance;
