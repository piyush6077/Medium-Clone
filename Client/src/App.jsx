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
        <BrowserRouter>
            <Routes>
              <Route path='/' element={authUser ? <HomePage/>: <Navigate to="/login" />}></Route>
              <Route path='/signup' element={!authUser ? <SignUp/> : <Navigate to='/login' /> }></Route>
              <Route path='/login' element={!authUser ? <Login/> : <Navigate to='/' />}></Route>
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
        </BrowserRouter>
      
        <Toaster/>
    </div>
  )
}

export default App
