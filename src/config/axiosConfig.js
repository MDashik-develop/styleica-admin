import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = import.meta.env.VITE_API_BASE_URL

// No authentication
export const axiosPublic = axios.create({
    baseURL: BASE_URL,
});

// With authentication
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    timeout: 20000, // Optional
});

axiosPrivate.interceptors.request.use(
    (config) => {
        const token = Cookies.get("u_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);