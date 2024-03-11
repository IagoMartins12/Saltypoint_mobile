import axios from 'axios';
import {getUserLocalStorage} from '../utils/auth';

export const Api = axios.create({
  baseURL: process.env.BASE_URL || 'http://192.168.100.141:3333/', // casa
  // baseURL: process.env.BASE_URL || 'http://192.168.168.173:3333/', // trabalho
});

Api.interceptors.request.use(
  async config => {
    const user = await getUserLocalStorage();
    if (user === undefined || user === null) {
      delete config.headers.Authorization;
      return config;
    }

    config.headers.Authorization = `Bearer ${user}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
