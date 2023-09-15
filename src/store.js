import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./components/taskSlice";

export default configureStore({
  reducer: {
    task: taskReducer,
  },
});
