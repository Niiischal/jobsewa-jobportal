import { axiosInstance } from "./axiosInstance";

export const PostInterest = async (payload) =>{
    try {
        const response = await axiosInstance.post("/api/interests/post-interests", payload)
        return response.data;
    } catch (error) {
        return { success: false, message: error.message };
    }
}