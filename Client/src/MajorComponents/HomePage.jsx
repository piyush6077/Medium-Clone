import React from 'react'
import Navbar from './Navbar'
import HomeContainer from './HomeContainer'

const HomePage = () => {
  return (
    <div className='w-[100vw]'>
      <Navbar/>
      <div className='flex justify-center w-[100vw]'>
        <HomeContainer/>
      </div>
    </div>
  )
}

export default HomePage
