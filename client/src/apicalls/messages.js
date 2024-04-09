import { axiosInstance } from "./axiosInstance";

export const AddMessage = async (payload) => {
    try {
      const response = await axiosInstance.post("/api/messages/add-message", payload)
      return response.data;
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  export const GetMessages = async (chatId) => {
    try {
      const response = await axiosInstance.get(`/api/messages/get-messages/${chatId}`);
      return response.data;
    } catch (error) {
      return { success: false, message: error.message };
    }
  };