import { axiosInstance } from "./axiosInstance";

export const LoginUser = async(payload) => {
    try {
        const response = await axiosInstance.post("/api/login", payload);
        return response.data;
    } catch (error) {
        return error.message
    }
}