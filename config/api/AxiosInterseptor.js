import axios from "axios";
import { toast } from "sonner";
import { ApiStatus } from "@/helper/helper";
const httpRequest = axios.create({ withCredentials: true });

httpRequest.interceptors.request.use(
  (config) => {
    config.withCredentials = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

httpRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message;

    switch (status) {
      case ApiStatus.STATUS_403:
        toast.error("Access Denied");
        break;
      case ApiStatus.STATUS_422:
        toast.error("Validation Error: " + (message || "Invalid data."));
        break;
      default:
        toast.error(message || "Something went wrong.");
        break;
    }
    return Promise.reject(error);
  }
);

export default httpRequest;
