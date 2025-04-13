import axios from "axios";

const baseConfig = {
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  timeout: 60 * 1000,
};

const axiosInstance = axios.create(baseConfig);

export default axiosInstance;
