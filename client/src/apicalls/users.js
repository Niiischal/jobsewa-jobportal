import { axiosInstance } from "./axiosInstance";

export const RegisterUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/users/register", payload);
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const LoginUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/users/login", payload);
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const GetCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/api/users/get-current-user");
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const forgotPassword = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/users/forgot-password",
      payload
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const VerificationOTP = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/users/verification-OTP",
      payload
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};
