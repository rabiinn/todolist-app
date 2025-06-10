import { useEffect, useState } from "react";
import Todo from "./components/Todo";
import todoservice from './services/Todo-service.js';

const App = () => {

  const [todolist, setTodolist] = useState([]);

  useEffect(() => {
    const fetchTodos =  async ()  => {
      const todos = await todoservice.getAll();
      setTodolist(todos);
    }
    fetchTodos();
  },[]);

  return (
    <>
    <div>My TODOLIST App</div>
      <table border="1">
        <thead>
          <tr>
            <th>Status</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created At</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todolist.map(todo => (
            <Todo key={todo.id} todo={todo} />
          ))}
        </tbody>
      </table>
    </>
  )
}

export default App