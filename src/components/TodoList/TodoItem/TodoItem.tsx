import { useMemo } from "react";
import { StyledTodoItem } from "./TodoItem.styled";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../App";
import { Todo } from "../TodoList";
import { todoAction } from "../../../store/todos-slice/slice";
import { useAppDispatch } from "../../../store";

const TodoItem: React.FC<Todo> = ({ id, date, title, description }) => {
  const strDate = useMemo(() => new Date(date).toLocaleString("en-US"), [date]);
  const navigate = useNavigate();
  const to = () => {
    navigate(ROUTES.detail + "/" + id);
  };
  const dispatch = useAppDispatch();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(todoAction.deleteTodo(id));
  };

  return (
    <StyledTodoItem onClick={to}>
      <section>
        <h2>{title}</h2>
        <p>{description}</p>
      </section>
      <section>
        <span>{strDate}</span>
        <button onClick={handleDelete}>X</button>
      </section>
    </StyledTodoItem>
  );
};

export default TodoItem;
