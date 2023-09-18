import React, { useState } from 'react'
import Navbars from './Navbars'
import {toast} from 'react-toastify'
import axios from 'axios'



const Register = () => {

    const [registerForm, setRegisterForm] = useState({})

    const handleOnChange = (e) =>{

        const {name, value} = e.target

        setRegisterForm({...registerForm, [name]: value})
    }
    const handleOnSubmit =  async (e) =>{
        e.preventDefault()

         if (registerForm.password === registerForm.confirmPassword) {
          const {confirmPassword, ...rest} = registerForm

          
          try {
            await axios.post("http://localhost:3001/register", rest);
            window.location.reload();
            toast.success("User Registered."); 
            
          } catch (error) {
            console.log(error);
          }

        } else {
            toast.error("Password and confirm password do not match!")
        }

      
        

    }
  return (
    <>
    <Navbars/>
     <div className="mt-12 mb-6">
          <h1 className="text-center  text-3xl   font-bold leading-9 tracking-tight text-gray-900">
            Register
          </h1>
        </div>

        <div
          className="container  p-4 m-4 my-8 mx-auto  sm:mt-2 
     flex-col justify-around sm:flex-row  shadow-lg"
        >
          

          {/* register form */}
          <div className="p-3">
            <div className=" ">
              <form 
              onSubmit={handleOnSubmit}>
                <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      First name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="firstName"
                        onChange={handleOnChange}
                        required={true}
                        className="block w-full rounded-md border-2 sm:border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6 pl-5"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Last name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="lastName"
                        onChange={handleOnChange}
                        required={true}
                        className="block w-full rounded-md border-2 sm:border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6 pl-5"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        name="email"
                        type="email"
                        onChange={handleOnChange}
                        required={true}
                        className="block w-full rounded-md border-2 sm:border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6 pl-5"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Password
                    </label>
                    <div className="mt-2">
                      <input
                        name="password"
                        type="password"
                        onChange={handleOnChange}
                        required={true}
                        className="block w-full rounded-md border-2 sm:border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6 pl-5"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Confirm Password
                    </label>
                    <div className="mt-2">
                      <input
                        name="confirmPassword"
                        type="password"
                        onChange={handleOnChange}
                        required={true}
                        className="block w-full rounded-md border-2 sm:border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6 pl-5"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 bg-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                    >
                      Register
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>


      
    </>
  )
}

export default Register
