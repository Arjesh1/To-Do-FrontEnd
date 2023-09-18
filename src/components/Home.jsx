import React from "react";
import Create from "./Create";
import TasksList from "./TasksList";
import Navbars from "./Navbars";

const Home = () => {
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
