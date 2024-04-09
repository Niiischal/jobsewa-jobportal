import { axiosInstance } from "./axiosInstance";

export const CreateChat = async (payload) => {
    try {
      const response = await axiosInstance.post("/api/chats/create-chat", payload);
      return response.data;
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  export const GetChatById = async (id) => {
    try {
      const response = await axiosInstance.get(`/api/chats/get-chat/${id}`);
      return response.data;
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  export const FindChat = async (firstId, secondId) => {
    try {
      const response = await axiosInstance.get(`/api/chats/find/${firstId}/$ ${secondId}`);
      return response.data;
    } catch (error) {
      return { success: false, message: error.message };
    }
  };