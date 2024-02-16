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

export const GetJobById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/jobs/get-job-by-id/${id}`);
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const SaveJobById = async (id) => {
  try {
    const response = await axiosInstance.post(`/api/jobs/save-job-by-id/${id}`);
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const GetSavedJobById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/jobs/get-saved-jobs/${id}`);
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const ApplyJob = async (id) => {
  try {
    const response = await axiosInstance.post(`/api/jobs/apply-job/${id}`);
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const GetAppliedJobById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/jobs/get-applied-jobs/${id}`);
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
