import { axiosInstance } from "./axiosInstance";

export const PostInterest = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/interests/post-interests",
      payload
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const GetInterests = async (filters) => {
  try {
    const response = await axiosInstance.post(
      "/api/interests/get-interest",
      filters
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const EditInterest = async (id, payload) => {
  try {
    const response = await axiosInstance.put(
      `/api/interests/edit-interests/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const DeleteInterest = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/interests/delete-interests/${id}`);
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const GetAllInterests = async () => {
  try {
    const response = await axiosInstance.get("/api/interests/get-interests");
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};