import { useEffect, useRef, useState } from "react";
import Todo from "./components/Todo";
import todoservice from './services/Todo-service.js';
import loginService from "./services/login-service.js";
import LoginForm from "./components/LoginForm.jsx";
import ModalForm from "./components/ModalForm.jsx";
import TodoForm from "./components/TodoForm.jsx";
const App = () => {

  const [todolist, setTodolist] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [todoToEdit, setTodoToEdit] = useState(null);

  const  modalRef = useRef();
  const editModalRef = useRef();

  useEffect(() => {
    const fetchTodos =  async ()  => {
      const todos = await todoservice.getAll();
      setTodolist(todos);
    }
    fetchTodos();
  },[]);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if(loggedUser){
      const user = JSON.parse(loggedUser)
      setUser(user)
      todoservice.setToken(user.token)
    }
  },[])


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


  const createTodo = async ({title, description}) => {
    try{
      const newTodo = {
        title,
        description
      }
    const returnedTodo = await todoservice.create(newTodo);
    setTodolist(todolist.concat(returnedTodo))
    }
  
    catch(error){
      console.log(error)
    }
  }

 
  const deleteAtodo = async (id) => {
    try {
      await todoservice.deleteTodo(id);
      setTodolist(todolist.filter(todo => todo.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  const updateTodo = async (updatedTodo) => {
    try{
        const returnedTodo = await todoservice.update(updatedTodo.id, updatedTodo);
        console.log("Response from backend:", returnedTodo);
        if(!returnedTodo){
          console.log("failed to update")
          return
        }
        setTodolist(todolist.map(todo => 
          todo.id === returnedTodo.id ? returnedTodo : todo
        ))

    }
    catch(error){
      console.log(error)
    }
  }

  const handleEdit = (todo) => {
    setTodoToEdit(todo);
    editModalRef.current.openModal();
  }


  return (
    <>
      {!user && (
        <LoginForm
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      )}
      {user && (
        <>
          <div className="container mt-5">

            <div className="d-flex justify-content-end me-5">
              <button onClick={handleLogout} className="btn btn-outline-danger">
                Logout
              </button>
            </div>

          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-8 text-center">
            <button
              className="btn btn-primary my-3"
              onClick={() => modalRef.current.openModal()}
            >
              Add a ToDo
            </button>
            <ModalForm ref={modalRef}>
              <TodoForm
                createTodo={createTodo}
                closeModal={() => modalRef.current?.closeModal()}
                updateTodo={updateTodo}
                existingTodo={todoToEdit}
              />
            </ModalForm>

            <ModalForm ref={editModalRef}>
              <TodoForm
              existingTodo={todoToEdit}
              updateTodo={updateTodo}
              createTodo={createTodo}
              closeModal={() => editModalRef.current?.closeModal()}
              />
            </ModalForm>
          
                <h2 className="mb-4 text-center">Todo List</h2>
                <table className="table table-striped table-hover">
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
                    {todolist.map((todo) => (
                      <Todo key={todo.id} todo={todo} deleteAtodo={deleteAtodo} edit={handleEdit} />
                    ))}
                  </tbody>
                </table>
                </div>
           </div>
          </div>
          
        </>
      )}
    </>
  )
}

export default App