import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showEditModal: false,
};

const taskSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setShowEditModal: (state, { payload }) => {
      state.showEditModal = payload;
    },
  },
});

const { reducer, actions } = taskSlice;
export const { setShowEditModal } = actions;
export default reducer;
