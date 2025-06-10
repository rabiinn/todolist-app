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
    <div className="container mt-5">
      <h2 className="mb-4">Todo List</h2>
      <table className="table table-striped table-bordered table-hover">
        <thead className="table-dark">
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
      </div>
    </>
  )
}

export default App