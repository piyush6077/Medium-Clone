import React from 'react'
import { Hand, Star } from 'lucide-react'

const HomeContainer = () => {
  return (
    <div className='bg-amber-500 w-[80%]'>
      <div className='flex items-center h-20 gap-2 px-6 bg-red-600'>
        <div className='px-4 bg-blue-600'>For You</div>
        <div className='px-4 bg-blue-600'>Following</div>
        <div className='px-4 bg-blue-600'>Featured</div>
      </div>
      <div className="flex items-center w-full px-10 justify-between mb-5 h-50">
        <div className='flex flex-col py-4 gap-3 bg-green-500 w-[60%] md:w-full h-full'>
            <div className='flex items-center gap-3 text-xs'>
                <img src="" alt="" className='w-6 h-6'  />
                <h1>
                    In Level Up Coding By Jacob Bennett
                </h1>
            </div>
            <div className='flex flex-col gap-2'>
                <h1 className='text-3xl w-full font-semibold mt-2 md:text-2xl'>
                    The 5 paid subscriptions I actually use in 2025 as a staff software Engineer
                </h1>
                <p className='text-sm'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente, alias!
                </p>
            </div>
            <div className='flex text-xs gap-5'>
                <div className='w-16 flex items-center gap-3'>
                    <Star width={16}/>
                    <p>date</p>
                </div>
                <div className='w-16 flex items-center gap-3'>
                    <Hand width={16}/>                
                    <p>+20</p>
                </div>
                <div className='w-16 flex items-center gap-3'>
                    <Hand width={16}/>                
                    <p>+20</p>
                </div>
            </div>
        </div>
        <div className='w-[30%] h-full bg-red-500 flex items-center '>
            <img src="" alt="" className='w-[90%] rounded-xl h-30'/>
        </div>
      </div>
      
    </div>
  )
}

export default HomeContainer
