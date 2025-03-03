import { create } from 'zustand'
import { toast } from 'react-hot-toast'
import { axiosInstance } from '../lib/axios'

const usePostStore = create((set) => ({
  posts: [],
  isPostLoading : false,
  isSendingPostToBrowser : false,

  sendPost: async (data) => {
    set({isSendingPostToBrowser:true})
    try {
        const res = await axiosInstance.post('/post/createPost' , data)
        set({posts:[res.data]})
        toast.success(res.data.message)
    } catch (error) {
        toast.error(error.response.data.message)
    } finally{
        set({isSendingPostToBrowser:false})
    }
  }
}))

export default usePostStore