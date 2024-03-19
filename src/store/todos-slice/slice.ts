import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITodo } from "../../components/TodoList/TodoList";

const initialState: { todos: ITodo[] } = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos(state, { payload }: PayloadAction<ITodo[]>) {
      state.todos = payload;
    },
    addTodo(state, { payload }: PayloadAction<ITodo>) {
      state.todos = [...state.todos, payload];
    },
    deleteTodo(state, { payload }: PayloadAction<number>) {
      state.todos = [
        ...state.todos.slice(0, payload),
        ...state.todos.slice(payload + 1),
      ];
    },
  },
});

export const todoAction = todoSlice.actions;
export default todoSlice.reducer;
