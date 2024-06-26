import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.DOMAIN, 
  withCredentials: true, 
});

export default axiosInstance;