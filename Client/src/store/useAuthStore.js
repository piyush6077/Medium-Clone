import { create } from 'zustand'
import { axiosInstance } from '../lib/axios.js'
import toast from 'react-hot-toast'

export const useAuthStore = create((set, get)=>({
    authUser: null,
    isSigningUp: false,
    isLogginIng: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async()=>{
        try {
            const res = await axiosInstance.get("/user/checkAuth")
            set({authUser: res.data})
        } catch (error) {
            console.log("Error on Cheackingauth")
            set({authUser: null})
        } finally {
            set({isCheckingAuth: false})
        }
    },

    signup: async(data)=>{
        set({isSigningUp: true})
        try {
            await axiosInstance.post("/user/register" , data)
            toast.success("Account Created ")    
            // setTimeout(() => {
            //     navigate("/login");
            // }, 2000);        
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({isSigningUp: false})
        }
    },

    login: async(data) => {
        set({isLogginIng: true})
        try {
            const res = await axiosInstance.post("/user/login" , data)
            set({authUser: res.data})
            toast.success("Logged in successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({isLogginIng: false})
        }
    },

    logout: async() => {
        try {
            await axiosInstance.post("/user/logout")
            set({authUser:null})
            toast.success("Logged Out Successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    updateProfileData: async(data) => {
        set({isUpdatingProfile:true})
        try {
            const res = await axiosInstance.put("/user/updateProfile" , data)
            set({
                authUser: res.data.updateUser,
            });
            toast.success("Updated Profile")
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({isUpdatingProfile:false})
        }
    }
 }))