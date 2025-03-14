import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import Navbar from './Navbar'
import { Bookmark, Cross, Hand, Plus, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import UpdateData from './UpdateData'

const ProfilePage = () => {

  const { authUser } = useAuthStore()
  const [editProfile, setEditProfile] = useState() 

  const closeUpdateProfile = () => {
    setEditProfile(false)
  }

  return (
    <>
    <Navbar />
    <div className='w-[100vw] relative  flex justify-center h-[90vh]'>
      <div className='w-[55%] flex-col flex border-r-[1px] border-gray-300'>
        <div className='flex pt-25 mb-10 items-center gap-x-5 '>
          <p className='text-6xl font-semibold'>
            {authUser.username}
          </p>
        </div>
        <div className='flex w-full gap-x-5 my-9'>
          <p>Author Post</p>
        </div>
        <div
              // key={post._id}
              // onClick={()=> selectePostDisplay(post)}
              className='flex items-center border-b-[1px] border-gray-200 w-full bg-yellow-500 justify-between mb-5 h-59 gap-10'
            >
              <div className='flex flex-col py-4 gap-3 w-[60%] md:w-full h-full'>
                <div className='flex items-center gap-3 text-xs'>
                  <img 
                    src={ authUser.avatar  || '/avatar.png'}  
                    alt=""
                    className="w-6 h-6 object-cover rounded-full shadow-md"
                  />
                  {/* <h1>{post.author?.username}</h1> */}
                </div>
                <div className='flex flex-col gap-2 text-gray-700'>
                  <h1 className='text-3xl w-full font-semibold mt-2 md:text-2xl'>
                    {/* {post.title} */}
                  </h1>
                  <p className='text-md md:text-sm h-10 text-gray-500'></p>
                  {/* {post.content?.[0]?.children?.[0]?.text.split(" ").slice(0, 25).join(" ") + " ..."}                  </p> */}
                </div>
                <div className='flex text-xs gap-5 mt-3 text-gray-800'>
                  <div className='w-16 flex items-center gap-3'>
                    <Star width={16} />
                    <p>date</p>
                  </div>
                  <div className='w-16 flex items-center gap-3'>
                    <Hand width={16} />
                    <p>+20</p>
                  </div>
                  <div className='w-16 pb-[2px] flex items-center gap-3'>
                    <Bookmark width={16}/>
                  </div>
                </div>
              </div>
              <div className='w-[30%] h-full flex items-center '>
                <div className='w-[90%] rounded-xl h-30 bg-green-800'></div>
              </div>
          </div>
      </div>
      <div className='w-[20%] gap-3 pt-20 pl-18 flex flex-col p-10'>
        <img 
          src={authUser.avatar} 
          alt="" 
          className='rounded-full h-21 w-21 object-cover'
        />
        <p className='font-semibold ml-1'>{authUser.username}</p>
        <button 
          onClick={()=>setEditProfile(true)}
          className='text-green-500 text-sm cursor-pointer 
          w-20 ml-1'>
          Edit profile
        </button>
      </div>
      {editProfile &&
        <div className='absolute bodyTransparent flex justify-center pt-5 w-[100vw] h-[91vh]'>
          <UpdateData closeUpdateProfile={closeUpdateProfile} />
        </div>
      }
    </div>
    </>
  )
}

export default ProfilePage
