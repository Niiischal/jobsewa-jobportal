import { axiosInstance } from "./axiosInstance";

export const AddJob = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/jobs/add-jobs", payload);
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const GetJobs = async (filters) => {
  try {
    const response = await axiosInstance.post("/api/jobs/get-jobs", filters);
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const EditJob = async (id, payload) => {
  try {
    const response = await axiosInstance.put(
      `/api/jobs/edit-jobs/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const DeleteJob = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/jobs/delete-jobs/${id}`);
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const UpdateJobStatus = async (id, status) => {
  try {
    const response = await axiosInstance.put(`/api/jobs/update-status/${id}`, {
      status,
    });
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};
