import { create } from 'zustand'
import { axiosInstance } from '../lib/axios.js'

export const useAuthStore = create((get)=>({
    authUser: null,
    isSigningUp: false,
    isLogginIng: false ,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async()=>{
        try {
            const res = await axiosInstance/get("/auth/checkAuth")
        } catch (error) {
            
        }
    }
}))