import axios from "axios";
import { toast } from "react-toastify";

const salesPartnerAxios = axios.create({
  baseURL: process.env.REACT_APP_SALES_PARTNER_URL,
});

const coreAxios = axios.create({
  baseURL: process.env.REACT_APP_CORE_URL,
});

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    toast.error("An unexpected error occurred");
  }

  return Promise.reject(error);
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  salesPartnerGet: salesPartnerAxios.get,
  salesPartnerPost: salesPartnerAxios.post,
  salesPartnerPut: salesPartnerAxios.put,
  salesPartnerDelete: salesPartnerAxios.delete,
  coreGet: coreAxios.get,
  corePost: coreAxios.post,
  corePut: coreAxios.put,
  corePatch: coreAxios.patch,
  coreDelete: coreAxios.delete,
};
