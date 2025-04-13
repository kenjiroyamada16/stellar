import axiosInstance from "./axios.config";

const ApiService = {
  get: async (path: string, params?: object) => {
    const { data } = await axiosInstance.get(path, { params });

    return data;
  },
  post: async (path: string, params?: object) => {
    const { data } = await axiosInstance.post(path, params);

    return data;
  },
  put: async (path: string, params?: object) => {
    const { data } = await axiosInstance.put(path, params);

    return data;
  },
  delete: async (path: string, params?: object) => {
    const { data } = await axiosInstance.delete(path, { params });

    return data;
  },
};

export default ApiService;
