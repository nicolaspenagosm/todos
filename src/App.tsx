import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import TodoList from "./components/TodoList";
import { useEffect, useState } from "react";
import { ITodo } from "./components/TodoList/TodoList";
import TodoForm from "./components/TodoForm";

export const ROUTES = {
  todos: "/",
  edit: "/edit",
  detail: "/detail",
};

function App() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [shouldRunEffect, setShouldRunEffect] = useState(false);

  useEffect(() => {
    const items = localStorage.getItem("todos");

    if (items && !shouldRunEffect) {
      setShouldRunEffect(true);
      setTodos(JSON.parse(items));
    }

    if (shouldRunEffect) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [shouldRunEffect, todos]);

  const handleAddTodo = (todo: ITodo) => {
    setTodos((prev) => [...prev, todo]);
  };

  const handleDelete = (indx: number) => {
    setTodos((prev) => [...prev.slice(0, indx), ...prev.slice(indx + 1)]);
  };

  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path={ROUTES.todos} element={<TodoList todos={todos} deleteFn={handleDelete} />} />
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
