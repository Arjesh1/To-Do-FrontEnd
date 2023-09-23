import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { setShowEditModal, setTasks } from "./taskSlice";
import { toast } from "react-toastify";

const TasksList = () => {
  const {tasks} = useSelector(state => state.task)
  const [selectedTask, setSelectedTask] = useState({});
  const dispatch = useDispatch();

  const handleOnEdit = (item) => {
    setSelectedTask(item);
    dispatch(setShowEditModal(true));
  };    

  const handleOnDelete = async (id) => {

    const confirmed = window.confirm("Are you sure you want to delete this?");
    if (confirmed) {
      try {
        dispatch(setShowEditModal(false));
        const response = await axios.delete(`http://localhost:3001/delete/${id}`); 
        if (response.data === "success"){
          toast.success("Task deleted successfully.")
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

    }
   
  };

  

 

  return (
    <>
      <Modal selectedTask={selectedTask} />
      <div className="container mx-auto mt-5">
        <table class=" w-full table-auto border-collapse border border-slate-400">
          <thead className="">
            <tr className="bg-slate-200">
              <th className="py-4">S/N</th>
              <th className="py-4">Task</th>
              <th className="py-4">Due Date</th>
              <th className="py-4">Status</th>
              <th className="py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks?.map((item, i) => (
              <tr className="border-b" key={item._id}>
                <td className="py-3">{i + 1}.</td>
                <td className="py-3">{item.task}</td>
                <td className="py-3">
                  {new Date(item.dueDate).toLocaleDateString()}
                </td>
                <td className="py-3">
                  {item.status === "notStarted" ? (
                  <>
                  Not Started
                </>
                ): item.status === "progress" ? (
                <>In Progress</>
                ) : item.status === "notImportant" ? (
                  <>Not Important</>
                )
                   : (<>Completed</>)
                
              }</td>
                <td className="py-3  ">
                  <div className="flex justify-evenly ">

                    
                    
                    <button
                      className="text-blue-300 text-2xl"
                      onClick={() => {
                        handleOnEdit(item);
                      }}
                    >
                      <AiFillEdit />
                    </button>
                    <button
                      className="text-red-600 text-2xl"
                      onClick={() => {
                        handleOnDelete(item._id);
                      }}
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TasksList;
