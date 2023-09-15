import React, { useEffect, useState } from "react";
import axios from "axios";

const TasksList = () => {
  const [tasks, setTask] = useState([]);
  useEffect(() => {
    try {
      axios
        .get("http://localhost:3001/get")
        .then((result) => setTask(result.data));
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
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
            {tasks.map((item, i) => (
              <tr className="border-b" key={item.id}>
                <td className="py-3">{i + 1}</td>
                <td className="py-3">{item.task}</td>
                <td className="py-3">
                  {new Date(item.dueDate).toLocaleDateString()}
                </td>
                <td className="py-3">Delete</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TasksList;
