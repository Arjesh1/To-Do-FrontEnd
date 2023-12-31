import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowEditModal, setTasks } from "./taskSlice.js";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { toast } from "react-toastify";

const Modal = ({ selectedTask }) => {
  const { showEditModal } = useSelector((state) => state.task);
  const dispatch = useDispatch();
  const cancelButtonRef = useRef(null);
  const [selectedData, setSelectedData] = useState({});

 

  function timestampToDateFormat(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); 
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  useEffect(() => {
    if (selectedTask) {
      const { task, dueDate, status } = selectedTask;
      const formattedDate = timestampToDateFormat(dueDate); 
      setSelectedData({
        task: task,
        dueDate: formattedDate,
        status: status,
      });
    }
  }, [selectedTask]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSelectedData({ ...selectedData, [name]: value, _id: selectedTask._id });
  };

  const handleOnUpdate = async (e) => {
    e.preventDefault();
    const dueDateTimestamp = new Date(selectedData.dueDate).getTime();
    selectedData.dueDate = dueDateTimestamp;

    try {
      dispatch(setShowEditModal(false));
      const response = await axios.put("http://localhost:3001/update", selectedData);
      if(response.data === "success"){
        toast.success("Task updated successfully."); // Show a success toast message
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
      <Transition.Root show={showEditModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={() => dispatch(setShowEditModal(false))}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <form>
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="">
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-lg font-semibold text-center leading-6 text-gray-900"
                          >
                            Update Tasks
                          </Dialog.Title>
                          <div className="mt-2 w-full">
                            <div className=" w-full  ">
                              <label>Task</label>
                              <input
                                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                type="text"
                                name="task"
                                onChange={handleOnChange}
                                value={selectedData?.task}
                              />
                            </div>

                            <div className=" w-full  ">
                            <label>Status</label>
                            <select name="status" className="block w-full rounded-md border-0 pl-5 py-1.5  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={selectedData?.status} onChange={handleOnChange}>
                    <option value="">--- Select ---</option>
                    <option value="notStarted">Not Started</option>
                    <option value="progress">In Progress</option>
                    <option value="notImportant">Not Important</option>
                    <option value="completed">Completed</option>
                    </select>

                            </div>

                            <div className="mt-2">
                              <label>Due Date</label>
                              <input
                                className="block w-full rounded-md border-0 pl-5 py-1.5  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                type="date"
                                name="dueDate"
                                onChange={handleOnChange}
                                value={selectedData?.dueDate}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md bg-yellow-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-400 sm:ml-3 sm:w-auto"
                        onClick={handleOnUpdate}
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => dispatch(setShowEditModal(false))}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default Modal;
