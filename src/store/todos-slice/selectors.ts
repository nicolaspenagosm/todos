import { AppState } from "..";

export const selectTodos = (state: AppState) => state.todos.todos;
