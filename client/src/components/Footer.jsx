import React from 'react'
import { location } from '../assets'

const Footer = () => {
  return (
    <div className=' bg-[#41506b] flex justify-between w-full h-[250px] text-white font-sans px-7 py-5 font-bold'>
        <div className='flex justify-evenly gap-10 h-[200px] max-w-full capitalize'>
          <div className='flex flex-col gap-2 w-[150px] text-left text-nowrap'>
            <h1 className='mb-5'>resources</h1>
            <h1 className='text-gray-300'>find a idea</h1>
            <h1 className='text-gray-300'>become a member</h1>
          </div>
          <div className='flex flex-col gap-2 w-fit text-left text-nowrap'>
            <h1 className='mb-5'>help</h1>
            <h1 className='text-gray-300'>get help</h1>
            <h1 className='text-gray-300'>status</h1>
            <h1 className='text-gray-300'>contact us <span className='lowercase'>abhinabdas004@gmail.com</span></h1>
            <h1 className='text-gray-300'>contact us <a href='https://twitter.com/abhi9ab_' className='text-blue-500 hover:underline' target='_blank'>twitter</a></h1>
          </div>
          <div className='flex flex-col gap-2 w-[150px] text-left text-nowrap'>
            <h1 className='mb-5'>about</h1>
            <h1 className='text-gray-300'>about us</h1>
            <h1 className='text-gray-300'>investors</h1>
            <h1 className='text-gray-300'>news</h1>
          </div>
        </div>
        <div>
          <div className='flex gap-4 cursor-pointer'>
            <img src={location} width={18} height={18}/>
            <p>India</p>
          </div>
        </div>
    </div>
  )
}

export default Footer