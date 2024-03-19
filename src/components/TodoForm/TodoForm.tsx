import { Link, useParams } from "react-router-dom";
import { StyledTodoFrom } from "./TodoForm.styled";
import { ROUTES } from "../../App";
import { useMemo, useState } from "react";
import { useAppDispatch } from "../../store";
import { todoAction } from "../../store/todos-slice/slice";
import { useSelector } from "react-redux";
import { selectTodos } from "../../store/todos-slice/selectors";
import { generateId } from "../../utils/id";

const TodoForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useSelector(selectTodos);
  const { id } = useParams<{ id: string }>();
  const index = useMemo(() => todos.findIndex((e) => e.id === id), [id, todos]);
  const selectedTodo = index !== -1 ? todos[+index] : null;
  const isEditing = selectedTodo === null;

  const [title, setTitle] = useState(selectedTodo ? selectedTodo.title : "");
  const [description, setDescription] = useState(
    selectedTodo ? selectedTodo.description : ""
  );

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      todoAction.addTodo({
        id: generateId(),
        title,
        description,
        date: Date.now(),
      })
    );
  };

  return (
    <StyledTodoFrom onSubmit={handleSubmitForm}>
      <Link to={ROUTES.todos}>Go back</Link>
      <input
        disabled={!isEditing}
        id="title"
        name="title"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        disabled={!isEditing}
        id="description"
        name="description"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {!isEditing && (
        <input
          id="date"
          name="date"
          disabled={true}
          value={new Date(selectedTodo!.date).toLocaleString("en-us")}
        />
      )}
      {isEditing && <button type="submit">Save</button>}
    </StyledTodoFrom>
  );
};

export default TodoForm;
