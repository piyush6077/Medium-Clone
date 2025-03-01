import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

const Navbar = () => {
  const {logout, authUser} = useAuthStore()

  const handleLogout = (e) => {
    logout()
  }
  return (
    <div>
        <button
            type="button"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleLogout}
        >
            {authUser ? "Log-In" : "Log-Out"}
        </button>
    </div>
  )
}

export default Navbar
