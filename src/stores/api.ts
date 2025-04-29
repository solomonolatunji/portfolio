import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      switch (status) {
        case 401:
          console.warn("API: Unauthorized request");
          break;
        case 403:
          console.warn("API: Forbidden request - insufficient permissions");
          break;
        case 404:
          console.warn("API: Resource not found");
          break;
        case 422:
          console.warn("API: Validation errors", error.response.data.errors);
          break;
        case 500:
          console.error("API: Server error", error.response.data);
          break;
        default:
          console.error(`API: Error ${status}`, error.response.data);
      }
    } else if (error.request) {
      console.error("API: No response received", error.request);
    } else {
      console.error("API: Request setup error", error.message);
    }

    return Promise.reject(error);
  }
);
