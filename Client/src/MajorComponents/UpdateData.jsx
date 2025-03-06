import React from 'react'

const UpdateData = () => {
  return (
    <div className='absolute top-8 w-[550px] flex flex-col items-center h-[600px] bg-white'>
          <h1 className='font-semibold pt-8 pb-6 text-2xl text-gray-800'>Profile Info</h1>
          <form 
            className='flex flex-col w-[90%]'
            onSubmit={handleUpdateSubmit}
          >
            <div className='flex'>
              <img src={updateProfile.image ? URL.createObjectURL(updateProfile.image) : authUser.image} className='w-28 h-28 rounded-full bg-green-600' />
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
              {isUpdatingProfile ? "Updating" : "Save"}
            </button>
          </form>
        </div>
  )
}

export default UpdateData
