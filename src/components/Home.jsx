import React, { useEffect, useState } from "react";
import Create from "./Create";
import TasksList from "./TasksList";
import Navbars from "./Navbars";
import axios from "axios";
import { setTasks } from "./taskSlice";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch()


  useEffect(() => {
    try {
       axios
        .get("http://localhost:3001/get")
        .then((result) => dispatch(setTasks(result?.data)), 
        
        );
    } catch (error) {
      console.log(error);

    }
  }, [dispatch]);

  


  return (
    <>
    <Navbars/>
    <div className="mt-4">
      <Create />

      <hr className="mt-5 " />

      <TasksList />
    </div>
    </>
  );
};

export default Home;
