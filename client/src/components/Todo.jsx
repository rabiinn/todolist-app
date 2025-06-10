const Todo = ({todo}) => {
    
    return(
        <tr>
            <td>{todo.status}</td>
            <td>{todo.title}</td>
            <td>{todo.description}</td>
            <td>{todo.createdat}</td>
            <td>{todo.dueDate}</td>
            <td>
                <button>Edit</button>
                <button>Delete</button>
            </td>
        </tr>
    )
}

export default Todo;