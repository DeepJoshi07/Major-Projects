import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL:'https://chat-app-backend-717f.onrender.com',
    withCredentials:true,
})
