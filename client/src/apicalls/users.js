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

export const GetAllUser = async () => {
  try {
    const response = await axiosInstance.get("/api/users/get-users");
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const UpdateUserStatus = async (id, status) => {
  try {
    const response = await axiosInstance.put(`/api/users/update-user-status/${id}`, {
      status,
    });
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

export const ResumeUpload = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/users/resume-upload",
      payload
    );
    return response.data
  } catch (error) {
    return { success: false, message: error.message };
  }
}

//update user information
export const UpdateUser = async (id, name, email) => {
  try {
    const response = await axiosInstance.put(
      `/api/users/update-user/${id}`,
      { name, email }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//change password
export const ChangePassword = async (id, password) => {
  try {
    const response = await axiosInstance.put(
      `/api/users/change-password/${id}`,
      { password }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};