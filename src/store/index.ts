import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todos-slice/slice";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: { todos: todoReducer },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type AppState = ReturnType<typeof store.getState>;
export default store;
