import React from 'react'
import {GiNotebook} from 'react-icons/gi'
import { Link } from 'react-router-dom'

const Navbars = () => {
  return (
    <>
    <nav
  class="relative flex w-full flex-wrap items-center justify-between bg-cyan-600 py-3 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:py-4">
  <div class="flex w-full flex-wrap items-center justify-between px-6">
    <div>
      <a
        class="mx-7 my-1 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 lg:mb-0 lg:mt-0"
        href="/">
            <GiNotebook className='text-white text-4xl '/>
       
      </a>
    </div>

    <div className='flex gap-4 text-white '>
     <div className=""> Profile</div>
     <div className=""> 
     <Link to="/login">

     Log In
     </Link>
     
     </div>
    </div>
  </div>
</nav>


      
    </>
  )
}

export default Navbars
