import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Todo } from "../../components/TodoList/TodoList";

const initialState: { todos: Todo[] } = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos(state, { payload }: PayloadAction<Todo[]>) {
      state.todos = payload;
    },
    addTodo(state, { payload }: PayloadAction<Todo>) {
      state.todos = [...state.todos, payload];
    },
    deleteTodo(state, { payload }: PayloadAction<string>) {
      const index = state.todos.findIndex((e) => e.id === payload);
      
      state.todos = [
        ...state.todos.slice(0, index),
        ...state.todos.slice(index + 1),
      ];
    },
    resetState(state) {
      state.todos = [];
    },
  },
});

export const todoAction = todoSlice.actions;
export default todoSlice.reducer;
