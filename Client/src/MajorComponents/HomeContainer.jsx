import React , {useEffect} from 'react'
import { Hand, Star } from 'lucide-react'
import usePostStore from '../store/usePostStore.js'
import { Link, useNavigate } from "react-router-dom";  

const HomeContainer = () => {
  
  const { posts , getAllPosts , isPostLoading , selectedPost, setSelectedPost} = usePostStore()
  const navigate = useNavigate()

  useEffect(() => {
    getAllPosts()
  }, [])

  useEffect(() => {
    console.log(selectedPost)
  }, [posts])
  
  const selectePostDisplay = (post) => {
    setSelectedPost(post._id)
    navigate(`/post/${post._id}`)
    console.log(selectedPost)
  }

  console.log(posts)
  return (
    <>
    <div className='w-[80%] mt-5 bg-gray-50'>
          <div className='flex items-center bg-white h-20 gap-2 px-6'>
            <Link to='/' className='px-4 hover:border-b-2'>For You</Link>
            <div className='px-4 hover:border-b-2'>Following</div>
            <div className='px-4 hover:border-b-2'>Featured</div>
          </div>
      {isPostLoading ? (
        <p className='flex items-center justify-center w-screen h-screen'>
          Loading...
        </p>
      ) : (
        posts.map((post) => (
            <div
              key={post._id}
              onClick={()=> selectePostDisplay(post)}
              className='flex items-center border-b-[1px] border-gray-200 w-full px-10 justify-between mb-5 h-50 gap-10'
            >
              <div className='flex flex-col py-4 gap-3 w-[60%] md:w-full h-full'>
                <div className='flex items-center gap-3 text-xs'>
                  <img src='' alt='' className='w-6 h-6' />
                  <h1>{post.author?.username}</h1>
                </div>
                <div className='flex flex-col gap-2'>
                  <h1 className='text-3xl w-full font-semibold mt-2 md:text-2xl'>
                    {post.title}
                  </h1>
                  <p className='text-sm h-10'>
                  {post.content?.[0]?.children?.[0]?.text}                  </p>
                </div>
                <div className='flex text-xs gap-5'>
                  <div className='w-16 flex items-center gap-3'>
                    <Star width={16} />
                    <p>date</p>
                  </div>
                  <div className='w-16 flex items-center gap-3'>
                    <Hand width={16} />
                    <p>+20</p>
                  </div>
                  <div className='w-16 flex items-center gap-3'>
                    <Hand width={16} />
                    <p>+20</p>
                  </div>
                </div>
              </div>
              <div className='w-[30%] h-full flex items-center '>
                {/* <img src='' alt='' /> */}
                <div className='w-[90%] rounded-xl h-30 bg-green-800'></div>
              </div>
            </div>
        ))
      )}    
    </div>
  </>
  )
}

export default HomeContainer
