import styled from "styled-components";

export const StyledTodoList = styled.section`
  display: flex;
  flex-direction: column;
  width: 40rem;
  gap: 1rem;
  a{
    margin-left: auto;
    margin-right: auto;
  }
`;

export const StyledTodo = styled.article`
  display: flex;
  border: solid 1px #6a6b6c;
  padding: 0.5rem 1rem 0.5rem 1rem;
  justify-content: space-between;
  border-radius: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: #EAEBFF;
  }

  align-items: center;
  button {
    margin-left: 1rem;
  }
`;
