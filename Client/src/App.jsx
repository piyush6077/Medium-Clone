import React from 'react'
import { Route , Routes , BrowserRouter} from "react-router-dom"
import HomePage from './MajorComponents/HomePage'
import Navbar from './MajorComponents/Navbar'
import SignUp from './MajorComponents/SignUp'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <div>
        <Navbar/>
        
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage/>}></Route>
                <Route path='/signup' element={<SignUp/>}></Route>
            </Routes>
        </BrowserRouter>
      
        <Toaster/>
    </div>
  )
}

export default App
