import React from 'react'
import { Route , Routes , BrowserRouter} from "react-router-dom"
import HomePage from './MajorComponents/HomePage'
import Navbar from './MajorComponents/Navbar'

const App = () => {
  return (
    <div>
        <Navbar/>
        
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage/>}></Route>
            </Routes>
        </BrowserRouter>
      
    </div>
  )
}

export default App
