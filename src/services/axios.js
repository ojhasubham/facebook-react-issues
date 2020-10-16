import axios from "axios";
import { toast } from "react-toastify";

const generateAxiosInstance = async ({ contentType = null, accept }) => {
  return new Promise((resolve) => {
    const instance = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      headers: {
        "content-type": contentType ? contentType : "application/json",
        accept: accept ? accept : "",
        Authorization: sessionStorage.accessToken || localStorage.accessToken,
      },
    });

    instance.interceptors.request.use(
      (config) => {
        document.getElementById("cover-spin").style.display = "block";
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken && accessToken !== config.headers.Authorization) {
          if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    instance.interceptors.response.use(
      (response) => {
        document.getElementById("cover-spin").style.display = "none";
        return response;
      },
      (error) => {
        document.getElementById("cover-spin").style.display = "none";
        if (error.response) {
          const { status, data } = error.response;
          if (status) {
            console.log("error with status code : ", status);
            if (status === 401) {
              localStorage.clear();
              sessionStorage.clear();
              if (window.location && window.location.hash !== "#/login") {
                window.location.replace("/#/login");
              }
            }
          }
          if (data && data.message) {
            toast.error(data.message);
          }
        }
        return Promise.reject(error);
      }
    );
    resolve(instance);
  });
};

export default generateAxiosInstance;
