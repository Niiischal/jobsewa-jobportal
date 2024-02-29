import { axiosInstance } from "./axiosInstance";

export const GenerateResume = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/resumes/generate-resume",
      payload
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};