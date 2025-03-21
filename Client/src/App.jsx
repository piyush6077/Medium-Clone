import React, { useEffect } from 'react'
import { Route , Routes , BrowserRouter} from "react-router-dom"
import HomePage from './MajorComponents/HomePage'
import SignUp from './MajorComponents/SignUp'
import { Toaster } from 'react-hot-toast'
import Login from './MajorComponents/Login'
import { useAuthStore } from './store/useAuthStore'
import { Navigate } from "react-router-dom"
import { Loader } from 'lucide-react'
import WritingCanvas from './MajorComponents/WritingCanvas'
import Navbar from './MajorComponents/Navbar'
import ParticularPost from './MajorComponents/ParticularPost'
import ProfilePage from './MajorComponents/ProfilePage'
import UpdateData from './MajorComponents/UpdateData'

const App = () => {
  const {authUser , checkAuth , isCheckingAuth} = useAuthStore()

  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  if(isCheckingAuth && !authUser) return (
    <div className='flex items-center bg-black justify-center h-screen'>
      <Loader className="size-18 animate-spin text-white"></Loader> 
    </div>
  )

  return (
    <div>
            <Routes>
              <Route path='/' element={authUser ? <HomePage/>: <Navigate to="/login" />}></Route>
              <Route path='/signup' element={!authUser ? <SignUp/> : <Navigate to='/login' /> }></Route>
              <Route path='/login' element={!authUser ? <Login/> : <Navigate to='/' />}></Route>
              <Route path='/profile' element={authUser ? <ProfilePage/> : <Navigate to='/login' />}></Route>
              <Route path='/post/:id' 
                element={authUser && 
                  <>
                    <Navbar/>,
                    <ParticularPost/>
                  </>
                }
                >
              </Route>
              <Route path='/write' element={authUser ? <> <Navbar/>, <WritingCanvas/> </> : <Login/>}></Route>                
            </Routes>

      
        <Toaster/>
    </div>
  )
}

export default App
