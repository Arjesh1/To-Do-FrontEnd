import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import { setShowEditModal } from "./taskSlice";

const TasksList = () => {
  const [tasks, setTask] = useState([]);
  const [selectedTask, setSelectedTask] = useState({});
  const [progressData, setProgressData] = useState({})
  const dispatch = useDispatch();
  
  useEffect(() => {
    try {
       axios
        .get("http://localhost:3001/get")
        .then((result) => setTask(result?.data));
    } catch (error) {
      console.log(error);
    }
  }, []);


  const handleOnEdit = (item) => {
    setSelectedTask(item);
    dispatch(setShowEditModal(true));
  };    

  const handleOnDelete = async (id) => {
    try {
      dispatch(setShowEditModal(false));
      await axios.delete(`http://localhost:3001/delete/${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChangeCheck = async (item, e) => {

    item.status = e.target.value

    
    // try {

    //   await axios.post("http://localhost:3001/add", item);
    //   // toast.success("Task Added."); // Show a success toast message
    //   window.location.reload();
      
    // } catch (error) {
    //   console.log(error);
      
    // }
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
