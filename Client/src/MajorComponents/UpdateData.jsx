import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UpdateData = ({closeUpdateProfile}) => { 
  const { authUser , updateProfileData ,isUpdatingProfile } = useAuthStore()
  
  const [updateProfile, setUpdateProfile] = useState({
    username: authUser?.username || "",
    bio: authUser?.bio || "",
    image: authUser?.avatar || ""
  });
  

  useEffect(() => {
    setUpdateProfile({
      username: authUser?.username || "",
      bio: authUser?.bio || "",
      image: authUser?.avatar || ""
    });
  }, [authUser?.username, authUser?.bio, authUser?.avatar]);
  
  console.log(authUser)
  
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if(updateProfile.username){
      formData.append("username", updateProfile.username);
    }
    if(updateProfile.bio){
      formData.append("bio", updateProfile.bio);
    }
    if (updateProfile.image instanceof File) {
      formData.append("avatar", updateProfile.image);
    }
  
    await updateProfileData(formData);
  };
  

  return (
    <div className='w-[550px] flex flex-col items-center h-[600px] bg-white'>
          <div className='flex w-full justify-end'>
            <Plus 
              className='flex rotate-45 m-1 cursor-pointer' 
              onClick={closeUpdateProfile}  
            />
          </div>
          <h1 className='font-semibold pt-5 pb-6 text-2xl text-gray-800'>Profile Info</h1>
          <form 
            className='flex flex-col w-[90%]'
            onSubmit={handleUpdateSubmit}
          >
            <div>Photo</div>
            <div className='flex mt-2'>
            <img 
              src={updateProfile.image instanceof File 
              ? URL.createObjectURL(updateProfile.image) 
              : updateProfile.image || '/avatar.png'} 
              className='w-24 h-24 rounded-full mb-10' 
            />

              <label className='relative w-15 h-5 mt-8 ml-7 text-green-700 font-semibold'>
                <input 
                  type="file" 
                  accept='image/*'
                  onChange={(e)=>setUpdateProfile({...updateProfile, image: e.target.files[0]})}
                  className='absolute cursor-pointer h-5 w-15 hidden' 
                />
                <p>Update</p>    
              </label>
            </div>
            <div className='flex flex-col gap-8'>
              <div className='flex flex-col gap-1'>                
                <label htmlFor="username" className=''>Username</label>
                <input 
                  type="text" 
                  className='w-full px-2 py-2 border-0 outline-none bg-gray-300'
                  value={updateProfile.username} 
                  onChange={(e)=>setUpdateProfile({...updateProfile,username: e.target.value})}
                />
              </div>
              <div className='flex flex-col gap-1'>
                <label htmlFor="bio" className=''>Short Bio</label>
                <textarea 
                  type="text" 
                  className='w-full resize-none p-2 outline-none h-30 border-0 bg-gray-300'
                  onChange={(e)=> setUpdateProfile({...updateProfile,bio: e.target.value})}
                />
              </div>
            </div>
            <button 
              className='py-2 rounded-lg mt-5 text-white  bg-green-600'
              type='submit'
              disabled={isUpdatingProfile}
            >
              {isUpdatingProfile ? "Updating..." : "Save"}
            </button>
          </form>
        </div>
      )
}

export default UpdateData
