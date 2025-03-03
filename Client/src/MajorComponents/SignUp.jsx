import React , {useState}from 'react'
import toast, { LoaderIcon } from 'react-hot-toast'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const SignUp = () => {
    const [formData, setFormData] = useState({
        username:"",
        email:"",
        password:""
    }) 
  
    const { signup , isSigningUp} = useAuthStore()

    const validateForm = () => {
      if(!formData.username) return toast.error("username is required");
      if(!formData.email) return toast.error("Email is Required");
      if(!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email Format")
      if(!formData.password) return toast.error("Password is Required");
      if(formData.password.length < 6) return toast.error("Password should be greater than 6 letters");
  
      return true
    }
    
    const handleSubmit = (e) => {
      e.preventDefault()
      const success = validateForm()
      if(success===true) signup(formData)
    }
  
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        alt="Your Company"
        src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
        className="mx-auto h-10 w-auto"
      />
      <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
        Sign in to your account
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
          <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
            username
          </label>
          <div className="mt-2">
            <input
              id="username"
              name="username"
              type="text"
              required
              value={formData.username}
            //   autoComplete="email"
              onChange={(e)=> setFormData({...formData, username: e.target.value})} 
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
            Email
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
            //   autoComplete="email"
              onChange={(e)=> setFormData({...formData, email: e.target.value})} 
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
              Password
            </label>
            <div className="text-sm">
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </a>
            </div>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              required
              // autoComplete="current-password"
              onChange={(e)=>setFormData({...formData, password:e.target.value})}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            disabled={isSigningUp}
          >
            {isSigningUp ? 
                (<div className='flex justify-center items-center gap-2'>
                  <Loader2 className='size-5 animate-spin'/>
                  <div>
                    Loading.... 
                  </div>
                </div>
              ):(
                "Create Account"
              )
            }
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm/6 text-gray-500">
        Already have Account?{' '}
        <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
          Login
        </Link>
      </p>
    </div>
  </div>

  )
}

export default SignUp
