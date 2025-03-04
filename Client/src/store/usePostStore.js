import { create } from 'zustand'
import { toast } from 'react-hot-toast'
import { axiosInstance } from '../lib/axios'

const usePostStore = create((set) => ({
  posts: [],
  isPostLoading : false,
  isSendingPostToBrowser : false,
  
  getAllPosts: async() => {
    set({isPostLoading: true})
    try {
      const res = await axiosInstance.get("/post/getAllPost");
      console.log(res.data.posts)
      set({posts: res.data.posts || []})   
    } catch (error) {
      toast.error(error.response.message.data)
    } finally {
      set({isPostLoading: false})
    }
  },

  sendPost: async (data) => {
    set({isSendingPostToBrowser:true})
    try {
        const res = await axiosInstance.post('/post/createPost' , data)
        set((state) => ({
          posts: [...state.posts, res.data.post]  // Assuming `res.data.post` contains the new post
        }));
        toast.success(res.data.message)
    } catch (error) {
        toast.error(error.response.data.message)
    } finally{
        set({isSendingPostToBrowser:false})
    }
  }
}))

export default usePostStore