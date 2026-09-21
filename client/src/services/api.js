import axios from "axios";

// ==========================================
// Axios Instance
// ==========================================

const api = axios.create({

    baseURL: `${import.meta.env.VITE_API_URL}/api`,

    headers: {

        "Content-Type": "application/json"

    }

});

// ==========================================
// Automatically Attach JWT Token
// ==========================================

api.interceptors.request.use(

    (config) => {

        const token = localStorage.getItem("token");

        if (token) {

            config.headers.Authorization = `Bearer ${token}`;

        }

        return config;

    },

    (error) => {

        return Promise.reject(error);

    }

);

export default api;