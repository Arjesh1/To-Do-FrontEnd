import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showEditModal: false,
  tasks : [],
};

const taskSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setShowEditModal: (state, { payload }) => {
      state.showEditModal = payload;
    },

    setTasks: (state, { payload }) => {
      state.tasks = payload;
    },
  },
});

const { reducer, actions } = taskSlice;
export const { setShowEditModal, setTasks } = actions;
export default reducer;
