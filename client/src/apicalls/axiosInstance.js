import axios from "axios";
export const axiosInstance = axios.create({
  headers: {
    authorization: `bearer ${localStorage.getItem("token")}`,
  },
});
