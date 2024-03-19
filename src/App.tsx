import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

export const ROUTES = {
  todos: "/",
  edit: "/edit",
  detail: "/detail",
};

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path={ROUTES.todos} element={<TodoList />} />
          <Route path={ROUTES.detail + "/:id"} element={<TodoForm />} />
          <Route path={ROUTES.edit} element={<TodoForm />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
