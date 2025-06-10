import { useEffect, useState } from "react";


const App = () => {

  const [todolist, setTodolist] = useState([]);

  useEffect(() => {
    const fetchTodos = async ()  => {
      const response = await fetch('http://localhost:8080/api/todos');
      if(!response.ok){
        throw new Error('Failed to fetch todos');
      }
      const todos = await response.json();
      console.log(todos);
      setTodolist(todos);
    }
    fetchTodos();
  },[]);

  return (
    <div>
      Hello World
    </div>
  )
}

export default App