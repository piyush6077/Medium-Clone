import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Eye, User , File, Bell, Search, PersonStanding, LibrarySquare, Bookmark, LucideBookmark, BarChartBig, LogOutIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [ menu , setMenu ] = useState(false)
  const { logout, authUser } = useAuthStore()

  const handleLogout = (e) => {
    logout()
  }

  return (
    <div className='w-full h-16 border-[1px] border-gray-400 flex justify-center'>
      <div className='flex w-[94%] items-center justify-between'>
        <div className='flex gap-x-8'>
          <Link to='/' className='font-semibold text-xl'>
            AIBLOG
          </Link>
          <div className='relative text-xs'>
            <input type="search" className='border-2 px-[25px] py-1 h-7 w-50 rounded-2xl'/>
            <Search className='absolute top-1 left-1' width={20} height={20}/>
          </div>
        </div>

        <div className='flex text-md text-gray-600 gap-x-8'>
            <Link  to='/write' className='flex gap-x-[5px] items-center'>
              <File width={22} className=''/>
              <p className="text-sm">Write</p>
            </Link>
            <div className='mt-[6px]'>
              <Bell width={23}/>
            </div>
            <div className='relative cursor-pointer'>
              <div 
                onClick={()=>setMenu(prev =>!prev)}
                className='w-8 h-8 rounded-full flex items-center justify-center bg-black'>
                <h1 className='text-white font-semibold'>P</h1>
              </div>
              {menu && (<div className='w-70 bg-white h-70 px-2 border-2 absolute right-[-42px] top-12 rounded-md'>
                <div className='text-md text-gray-600'>
                  <div className='px-4 py-3 mt-2 cursor-pointer flex gap-x-4 items-center'>
                    <User width={24}/>
                    <h1>
                      Profile
                    </h1>
                  </div>
                  <div className='px-4 py-3 cursor-pointer flex gap-x-4 items-center'>
                    <LucideBookmark/>
                    <h1>
                      Bookmark
                    </h1>
                  </div>
                  <div className='px-4 py-3 flex gap-x-5 cursor-pointer items-center'>
                    <LibrarySquare width={22}/>
                    <h1>
                      Library
                    </h1>
                  </div>
                  <div className='px-4 py-3 flex cursor-pointer gap-x-5 items-center'>
                    <BarChartBig width={22}/>
                    <h1>
                      Stats
                    </h1>
                  </div>
                </div>
                <button onClick={handleLogout} className='px-4 mt-5 py-3 cursor-pointer flex gap-x-5 items-center'>
                  <LogOutIcon width={19}/>
                    <h1>
                      {authUser ? "Log-In" : "Log-Out"}
                    </h1>
                </button>
              </div>
              )}
            </div>
        </div>
      </div>
{/*         
        <button
            type="button"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleLogout}
        >
            {authUser ? "Log-In" : "Log-Out"}
        </button> */}
    </div>
  )
}

export default Navbar
