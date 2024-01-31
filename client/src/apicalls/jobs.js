import { axiosInstance } from "./axiosInstance";

export const AddJob = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/jobs/add-jobs", payload);
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};


export const GetJobs = async () => {
  try {
    const response = await axiosInstance.get("/api/jobs/get-jobs");
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const EditJob = async (id, payload) => {
  try {
    const response = await axiosInstance.put(`/api/jobs/edit-jobs/${id}`,
    payload)
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const DeleteJob = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/jobs/delete-jobs/${id}`
    )
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};


