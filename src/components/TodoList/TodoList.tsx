import React, { useMemo } from "react";
import { StyledTodo, StyledTodoList } from "./TodoList.styled";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../App";

export interface ITodo {
  date: number;
  title: string;
  description: string;
}

const TodoList: React.FC<{ todos: ITodo[]; deleteFn: (i: number) => void }> = ({
  todos,
  deleteFn,
}) => {
  return (
    <StyledTodoList>
      {todos.map((todo, index) => (
        <Todo {...todo} index={index} key={index} deleteFn={deleteFn} />
      ))}
      <Link to={ROUTES.edit}>New Todo</Link>
    </StyledTodoList>
  );
};

const Todo: React.FC<ITodo & { index: number; deleteFn: (i: number) => void }> = ({
  date,
  title,
  description,
  index,
  deleteFn,
}) => {
  const strDate = useMemo(() => new Date(date).toLocaleString("en-US"), [date]);
  const navigate = useNavigate();
  const to = () => {
    navigate(ROUTES.detail + "/" + index);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteFn(index);
  };

  return (
    <StyledTodo onClick={to}>
      <section>
        <h2>{title}</h2>
        <p>{description}</p>
      </section>
      <section>
        <span>{strDate}</span>
        <button onClick={handleDelete}>X</button>
      </section>
    </StyledTodo>
  );
};

export default TodoList;