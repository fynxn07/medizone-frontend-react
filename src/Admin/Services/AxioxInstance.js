import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://medizone.duckdns.org",
  withCredentials: true,
});


axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        

        const res = await axios.post(
          "https://medizone.duckdns.org/medicals/auth/refresh/",
          {},
          { withCredentials: true }
        );

        const newAccess = res.data.access;
        console.log(newAccess)

        localStorage.setItem("access", newAccess);

        originalRequest.headers.Authorization =
          `Bearer ${newAccess}`;

        return axiosInstance(originalRequest);
      } catch (err) {
        localStorage.removeItem("access");
        localStorage.removeItem("isLoggedIn");
        window.location.href = "/login";
        console.log(err)
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
