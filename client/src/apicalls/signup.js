import { axiosInstance } from "./axiosInstance";

export const RegisterUser = async (payload) => {
    try {
      const response = await axiosInstance.post("/api/register", payload);
      return response.data;
    } catch (error) {
      return error.message;
    }
  };