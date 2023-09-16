import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import { setShowEditModal } from "./taskSlice";

const TasksList = () => {
  const [tasks, setTask] = useState([]);
  const [selectedTask, setSelectedTask] = useState({});
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

  const handleOnChangeCheck = (id, e) => {

    const {name, value} = e.target
    console.log(name , "=>",value);
    console.log(id);
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
                <td className="py-3  ">
                  <div className="flex justify-evenly ">

                    <div className="">
                    <select name="status" className="border" value={tasks.status} onChange={(e)=> {handleOnChangeCheck(item._id, e)}}>
                    <option value="">--- Select ---</option>
                    <option value="notStarted">Not Started</option>
                    <option value="progress">In Progress</option>
                    <option value="notDoing">Not Doing</option>
                    <option value="notImportant">Not Important</option>
                    <option value="completed">Completed</option>
                    </select>

                    </div>
                    
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
