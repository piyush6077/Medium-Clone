import { create } from 'zustand'
import { toast } from 'react-hot-toast'
import { axiosInstance } from '../lib/axios'
import { persist } from 'zustand/middleware'

const usePostStore = create(
  persist((set) => ({
  posts: [],
  likes: [],
  isPostLoading : false,
  isSendingPostToBrowser : false,
  selectedPost:null,

  getAllPosts: async() => {
    set({isPostLoading: true})
    try {
      const res = await axiosInstance.get("/post/getAllPost");
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
          posts: [...state.posts, res.data.post] 
        }));
        toast.success(res.data.message)
    } catch (error) {
        toast.error(error.response.data.message)
    } finally{
        set({isSendingPostToBrowser:false})
    }
  },

  setSelectedPost: async (selectedPost) => {
    // const { selectedPost } = get()
    // if(selectedPost._id === post._id) return;
    try {
      console.log(selectedPost)
      const res = await axiosInstance.get(`/post/${selectedPost}`)
      set({selectedPost: res.data})
      toast.success("Post")
    } catch (error) {
      toast.error(error.response.data.message)      
    }
  },

  toggleLike: async (postId) => {
    try {
        console.log("Liking post:", postId);
        const res = await axiosInstance.post(`/post/like/${postId}`);

        console.log("Response:", res.data);

        set((state) => {
            const updatedPosts = state.posts.map((post) =>
                post._id === postId ? { ...post, likes: res.data.likes } : post
            );

            const updatedSelectedPost = state.selectedPost && state.selectedPost.post._id === postId
                ? { ...state.selectedPost, post: { ...state.selectedPost.post, likes: res.data.likes || [] } }
                : state.selectedPost;

            return {
                posts: updatedPosts,
                selectedPost: updatedSelectedPost,
            };
        });

        toast.success(res.data.message);
    } catch (error) {
        console.error("Error in toggleLike:", error);
        toast.error(error.response?.data?.message || "Failed to like post");
    }
}


}),
  {
    name: "post-storage",
    getStorage: () => localStorage, 

  }

))

export default usePostStore;