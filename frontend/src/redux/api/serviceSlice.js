// redux/features/service/serviceSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  services: [],
  isLoading: false,
  error: null,
};

const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setServices: (state, action) => {
      state.services = action.payload;
    },
    addService: (state, action) => {
      state.services.push(action.payload);
    },
    removeService: (state, action) => {
      state.services = state.services.filter((service) => service._id !== action.payload);
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setServices, addService, removeService, setLoading, setError } = serviceSlice.actions;
export default serviceSlice.reducer;
