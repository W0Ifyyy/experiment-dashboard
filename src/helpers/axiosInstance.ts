import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://experiment-dashboard-postit.vercel.app/', 
  withCredentials: true, 
});

export default axiosInstance;