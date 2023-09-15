import React, { useState } from "react";
import axios from "axios";

const Create = () => {
  const [form, setForm] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const dueDateTimestamp = new Date(form.dueDate).getTime();
    form.dueDate = dueDateTimestamp;
    try {
      await axios.post("http://localhost:3001/add", form);
    } catch (error) {
      console.log(error);
    }
  };
  //   console.log(new Date(form.dueDate).toLocaleDateString());

  return (
    <>
      <span class=" text-2xl font-medium text-slate-700 mt-5"> To Do List</span>
      <form
        className="shadow-lg container mx-auto mt-8 py-4 px-2 border-2 border-slate-200"
        onSubmit={handleOnSubmit}
      >
        <div className=" container grid grid-cols-4 gap-1  w-screen">
          <div className="col-span-2">
            <label>Task</label>
            <input
              class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="text"
              name="task"
              onChange={handleOnChange}
            />
          </div>
          <div className="col-span-1">
            <label>Due Date</label>
            <input
              class="block w-full rounded-md border-0 pl-5 py-1.5  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="date"
              name="dueDate"
              onChange={handleOnChange}
            />
          </div>
          <div className="self-end">
            <button
              type="submit"
              className="rounded-lg bg-cyan-600 text-white px-2 py-1"
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
