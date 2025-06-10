const Todo = ({todo, deleteAtodo}) => {
    
    return(
        <tr>
            <td>{todo.status}</td>
            <td>{todo.title}</td>
            <td>{todo.description}</td>
            <td>{todo.createdat}</td>
            <td>{todo.dueDate}</td>
            <td>
                <button>Edit</button>
                <button onClick={()=> deleteAtodo(todo.id)}>Delete</button>
            </td>
        </tr>
    )
}

export default Todo;