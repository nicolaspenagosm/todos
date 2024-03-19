import React, { useEffect } from "react";
import { StyledTodoList } from "./TodoList.styled";
import { Link } from "react-router-dom";
import { ROUTES } from "../../App";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";
import { selectTodos } from "../../store/todos-slice/selectors";
import { useAppDispatch } from "../../store";
import { todoAction } from "../../store/todos-slice/slice";

export interface Todo {
  id: string;
  date: number;
  title: string;
  description: string;
}

const TodoList: React.FC = () => {
  const todos = useSelector(selectTodos);
  const dispatch = useAppDispatch();
  const handleOnClear = () => {
    dispatch(todoAction.resetState());
  };
  
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
  return (
    <StyledTodoList>
      {todos.map((todo) => (
        <TodoItem {...todo} key={todo.id} />
      ))}
      <Link to={ROUTES.edit}>New Todo</Link>
      {todos.length > 0 && <button onClick={handleOnClear}>Clear</button>}
    </StyledTodoList>
  );
};

export default TodoList;
