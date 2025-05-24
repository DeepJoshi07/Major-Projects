import {create} from 'zustand'
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import {io} from 'socket.io-client'

const URL = 'https://chat-app-backend-717f.onrender.com'
export const useAuthStore = create((set,get)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    onlineUsers:[],
    isCheckingAuth:true,
    socket:null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check')
            set({authUser:res.data})
            get().connectSocket()
    
        } catch (error) {
            console.log("Error in checkAuth : ",error);
            
        }finally{
            set({isCheckingAuth:false})
        }
    },

    signup: async(data) => {
        set({isSigningUp:true});
        try {
            const res = await axiosInstance.post('/auth/signup',data);
            toast.success('Account created successfully');
            set({authUser:res.data})
            get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isSigningUp:false})
        }
    },

    login: async(data) => {
        try {
            const res = await axiosInstance.post("/auth/login",data)
            set({authUser:res.data})
            toast.success("User logged in successfully")
            get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    logout: async() => {
        try {
            await axiosInstance.post("/auth/logout")
            set({authUser:null})
            toast.success("User logged out")
            get().disconnectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    updateProfile: async(data) => {
        set({isUpdatingProfile:true})
        try {
            const res = await axiosInstance.put("/auth/update-profile",data)
            set({authUser:res.data})
            toast.success('Profile updated successfully')
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({isUpdatingProfile:false})
        }
    },
    connectSocket: () =>{
        const {authUser} = get()
        if(!authUser || get.socket?.connected) return;
        const socket = io(URL,{
            query:{
                userId:authUser._id
            }
        })
        socket.connect()
        set({socket:socket})
        socket.on('getOnlineUsers',(userIds) => {
            set({onlineUsers:userIds})
        })
    },
    disconnectSocket: () =>{
        if(get().socket?.connected) get().socket.disconnect();
    },
}))
