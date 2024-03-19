import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import TodoList from "./components/TodoList";
import { useEffect } from "react";
import { ITodo } from "./components/TodoList/TodoList";
import TodoForm from "./components/TodoForm";
import { todoAction } from "./store/todos-slice/slice";
import { selectTodos } from "./store/todos-slice/selectors";
import { useAppDispatch } from "./store";
import { useSelector } from "react-redux";

export const ROUTES = {
  todos: "/",
  edit: "/edit",
  detail: "/detail",
};

function App() {
 
  const dispatch = useAppDispatch();
  const todos = useSelector(selectTodos);

  useEffect(() => {
    const items = localStorage.getItem("todos");
    if (items) {
      const parsedItems = JSON.parse(items);
      if (parsedItems.length > 0)
        dispatch(todoAction.setTodos(JSON.parse(items)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (todo: ITodo) => {
    dispatch(todoAction.addTodo(todo));
  };

  const handleDelete = (indx: number) => {
    dispatch(todoAction.deleteTodo(indx));
  };

  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route
            path={ROUTES.todos}
            element={<TodoList todos={todos} deleteFn={handleDelete} />}
          />
          <Route
            path={ROUTES.detail + "/:index"}
            element={<TodoForm todos={todos} />}
          />
          <Route
            path={ROUTES.edit}
            element={<TodoForm onAddTodo={handleAddTodo} />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
