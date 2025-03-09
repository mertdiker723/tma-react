import axios from 'axios';
const apiRoute = 'https://backend-igbd.onrender.com/api'
const localRoute = 'http://localhost:3000/api'

const baseURL = import.meta.env.MODE === 'production' ? apiRoute : localRoute;

axios.defaults.baseURL = baseURL;

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token') || "";
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        config.headers['Content-Type'] = 'application/json';
        return config;
    },
    (error) => Promise.reject(error)
);

export default axios;