import { useEffect, useState } from "react";
import Todo from "./components/Todo";
import todoservice from './services/Todo-service.js';
import loginService from "./services/login-service.js";
const App = () => {

  const [todolist, setTodolist] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchTodos =  async ()  => {
      const todos = await todoservice.getAll();
      setTodolist(todos);
    }
    fetchTodos();
  },[]);


  const handleLogin = async (event) => {
    event.preventDefault();
    try {
        const usertobeLoggedin = await loginService.createlogin({
          username, password
        });
        window.localStorage.setItem(
          'loggedUser', JSON.stringify(usertobeLoggedin)
        );
        todoservice.setToken(usertobeLoggedin.token);
        setUser(usertobeLoggedin);
        setUsername('');
        setPassword('');
    }

    catch(error){
      console.log(error);
    }
    console.log("Logging in with", username, password);
  }

  const handleLogout = async (event) => {
    event.preventDefault();
    window.localStorage.removeItem('loggedUser');
    setUser(null);
    setUsername('');
    setPassword('');
  }

  const handleCreateAtodo = async (event) => {
    event.preventDefault();
    try {
        const newTodo = {
          title: newTitle,
          description:newDescription
        }
        const returnedTodo = await todoservice.create(newTodo);
        setTodolist(todolist.concat(returnedTodo));
        setNewTitle('');
        setNewDescription('');
    }
    catch(error){
      console.log(error);
    }

  }

  const handleTitleChange = async (event) =>{
    setNewTitle(event.target.value);
  }
  const handleDescriptionChange = async (event) => {
    setNewDescription(event.target.value);
  }

  const deleteAtodo = async (id) => {
    await todoservice.deleteTodo(id);
  }


  return (
    <>
      {
        user ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <p>Login Form</p>
            <form onSubmit={handleLogin}>
              <div>
                Username <input onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div>
                Password <input onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button type="submit">Log in</button>
            </form>
          </>
        )
      }

      <form onSubmit={handleCreateAtodo}>
        <div>
          Title: <input onChange={handleTitleChange} value={newTitle} />
        </div>
        <div>
          Description: <input onChange={handleDescriptionChange} value={newDescription} />
        </div>
        <button type="submit">Create a todo</button>
      </form>
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
              <Todo key={todo.id} todo={todo} deleteAtodo={deleteAtodo} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App