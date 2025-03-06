import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import Navbar from './Navbar'
import { Bookmark, Cross, Hand, Plus, Star } from 'lucide-react'

const ProfilePage = () => {
  const [updateProfile , setUpdateProfile] = useState({
    username:"",
    bio: "",
    image: ""
  })

  const [editProfile , setEditProfile] = useState(true)
  const { authUser , updateProfileData ,isUpdatingProfile } = useAuthStore()
  
  const handleUpdateSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("username", updateProfile.username);
    formData.append("bio", updateProfile.bio);
    if (updateProfile.image){
      formData.append("avatar", updateProfile.image);
    }
    
    updateProfileData(formData)
    console.log(formData)
  }
  
  return (
    <>
    <Navbar />
    <div className='w-[100vw] relative  flex justify-center gap-x-20 h-[90vh] bg-red-600'>
      <div className='w-[55%] flex-col flex'>
        <div className='flex pt-25 items-center gap-x-5 bg-green-600'>
          <p className='text-4xl font-semibold'>
            {authUser.username}
          </p>
        </div>
        <div className='flex w-full gap-x-5 my-9'>
          <p>Author Post</p>
        </div>
        <div
              // key={post._id}
              // onClick={()=> selectePostDisplay(post)}
              className='flex items-center border-b-[1px] border-gray-200 w-full px-10 justify-between mb-5 h-59 gap-10'
            >
              <div className='flex flex-col py-4 gap-3 w-[60%] md:w-full h-full'>
                <div className='flex items-center gap-3 text-xs'>
                  <img 
                    src={'../../public/avatar.png'}  
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
      <div className='w-[20%] gap-3 flex flex-col bg-yellow-500 p-10'>
        <img 
          src={authUser.avatar || updateProfile.image || "../../public/avatar.png"} 
          alt="" 
          className='rounded-full h-21 w-21 object-cover'
        />
        <p className='font-semibold'>{authUser.username}</p>
        <button 
          onClick={()=>setEditProfile(true)}
          className='text-green-500 text-sm cursor-pointer 
          w-20 bg-blue-600'>
          Edit profile
        </button>
      </div>
      {editProfile && 
      (
        <div className='absolute top-8 w-[550px] flex flex-col items-center h-[600px] bg-white'>
          <div className='flex w-full justify-end'>
            <Plus className='flex rotate-45 m-1 cursor-pointer' onClick={()=>setEditProfile(false)}/>
          </div>
          <h1 className='font-semibold pt-5 pb-6 text-2xl text-gray-800'>Profile Info</h1>
          <form 
            className='flex flex-col w-[90%]'
            onSubmit={handleUpdateSubmit}
          >
            <div className='flex'>
              <img src={updateProfile.image ? URL.createObjectURL(updateProfile.image) : authUser.avatar || '../../public/avatar.png'} className='w-28 h-28 rounded-full' />
              <label className='relative w-15 h-5 bg-blue-400'>
                <input 
                  type="file" 
                  accept='image/*'
                  onChange={(e)=>setUpdateProfile({...updateProfile, image: e.target.files[0]})}
                  className='absolute h-5 w-15 hidden' 
                />
                Update
              </label>
            </div>
            <div className='flex flex-col gap-5'>
              <div className='flex flex-col gap-2'>                
                <label htmlFor="username">Username</label>
                <input 
                  type="text" 
                  className='w-full px-2 py-1 border-2 rounded-lg'
                  onChange={(e)=>setUpdateProfile({...updateProfile,username: e.target.value})}
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor="bio">Short Bio</label>
                <input 
                  type="text" 
                  className='w-full h-30 border-2 rounded-lg'
                  onChange={(e)=> setUpdateProfile({...updateProfile,bio: e.target.value})}
                />
              </div>
            </div>
            <button 
              className='py-2 rounded-lg bg-blue-600'
              type='submit'
              disabled={isUpdatingProfile}
            >
              {isUpdatingProfile ? "Updating..." : "Save"}
            </button>
          </form>
        </div>
      )

      }
    </div>
    </>
  )
}

export default ProfilePage
