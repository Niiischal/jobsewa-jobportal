import axios form "axios";
export const axiosInstance = axios.create({
    header : {
        authorization: `bearer ${localStorage.getItem("token")}`,
    }
})
