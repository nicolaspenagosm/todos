import { Link, useLocation, useParams } from "react-router-dom";
import { StyledTodoFrom } from "./TodoForm.styled";
import { ROUTES } from "../../App";
import { ITodo } from "../TodoList/TodoList";
import {  useState } from "react";

const TodoForm: React.FC<{
  todos?: ITodo[];
  onAddTodo?: (todo: ITodo) => void;
}> = ({ todos, onAddTodo }) => {
  const location = useLocation();
  const isEditing = location.pathname === ROUTES.edit;
  const { index } = useParams<{ index: string }>();

  let todo = null;
  if (!isEditing) todo = todos![+index!];

  const [title, setTitle] = useState(todo&&todo.title||"");
  const [description, setDescription] = useState(todo&&todo.description||"");

  return (
    <StyledTodoFrom
      onSubmit={(e) => {
        e.preventDefault();

        onAddTodo!({
          title,
          description,
          date: Date.now(),
        });
      }}
    >
      <Link to={ROUTES.todos}>Go back</Link>
      <input
        disabled={!isEditing}
        id="title"
        name="title"
        placeholder="Title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
      />
      <textarea
        disabled={!isEditing}
        id="description"
        name="description"
        placeholder="Description"
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
      />
      {!isEditing && (
        <input
          id="date"
          name="date"
          disabled={true}
          value={new Date(todo!.date).toLocaleString("en-us")}
        />
      )}
      {isEditing && <button type="submit">Save</button>}
    </StyledTodoFrom>
  );
};

export default TodoForm;
