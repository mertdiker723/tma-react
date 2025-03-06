// apiConfig.ts
import axios from 'axios';
const apiRoute = 'https://backend-igbd.onrender.com/api'
// const localRoute = 'http://localhost:3000/api'
axios.defaults.baseURL = apiRoute;

// Interceptor tanımlama
axios.interceptors.request.use(
    (config) => {
        config.url = `${axios.defaults.baseURL}${config.url}`;
        return config;
    },
    (error) => Promise.reject(error)
);

export default axios;