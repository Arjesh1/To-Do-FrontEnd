import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { setTasks } from "./taskSlice";
import { useDispatch } from "react-redux";

const initialState = {
  task : " ",
  dueDate : " ",
  status: " ",

}

const Create = () => {
  const [form, setForm] = useState(initialState);
  const dispatch = useDispatch()
  



  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm((data) => ({
      ...data,
      [name]: value, ["status"]: "notStarted"
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const dueDateTimestamp = new Date(form.dueDate).getTime();
    form.dueDate = dueDateTimestamp;

    try {
       const response = await axios.post("http://localhost:3001/add", form);
       if(response.data === "success"){
        toast.success("Task Added successfully."); // Show a success toast message
        try {
          axios
           .get("http://localhost:3001/get")
           .then((result) => dispatch(setTasks(result?.data)), 
           );
       } catch (error) {
         console.log(error);
   
       }
       } else {
        toast.error("Something went wrong. Please try again later!")
       }
     
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <span className=" text-2xl font-medium text-slate-700 mt-5">
        {" "}
        To Do List
      </span>
      <form
        className="shadow-lg container mx-auto mt-8 py-4 px-2 border-2 border-slate-200"
        onSubmit={handleOnSubmit}
      >
        <div className=" container grid grid-cols-4 gap-1  w-full">
          <div className=" col-span-2 ">
            <label>Task</label>
            <input
              class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="text"
              name="task"
              required = {true}
              onChange={handleOnChange}
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label>Due Date</label>
            <input
              class="block w-full rounded-md border-0 pl-5 py-1.5  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="date"
              name="dueDate"
              required = {true}
              onChange={handleOnChange}
            />
          </div>
          <div className="self-end col-span-4 px-5 sm:px-2 sm: mt-2 md:col-span-1 ">
            <button
              type="submit"
              className="rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white px-2 py-1 w-full"
            >
              {" "}
              + Add task
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Create;
