import { useEffect, useState } from "react";

const TodoForm = ({createTodo, closeModal, updateTodo, existingTodo}) => {

    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');

    useEffect(() => {
        if(existingTodo){
            setNewTitle(existingTodo.title)
            setNewDescription(existingTodo.description)
        }
    }, [existingTodo])

    const handleTitleChange = async (event) =>{
    setNewTitle(event.target.value);
  }
  const handleDescriptionChange = async (event) => {
    setNewDescription(event.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
       
        if(existingTodo) {
        console.log("existingTodo:", existingTodo);
        console.log("Payload to send:", { ...existingTodo, title: newTitle, description: newDescription });
            await updateTodo({... existingTodo, title: newTitle, description: newDescription})
        }
        else{
            await createTodo({title: newTitle, description: newDescription})
        }
        setNewTitle('')
        setNewDescription('')
        closeModal()
    }
    catch(error){
        console.log(error)
    }
  }

    return (
        <div>
                <form className="mt-3" onSubmit={handleSubmit}>
                    <input value ={newTitle}onChange={handleTitleChange} type="text" placeholder="Title" className="form-control mb-2" />
                    <textarea  value={newDescription} onChange={handleDescriptionChange} placeholder="Description" className="form-control mb-2" />
                    <button type="submit" className="btn btn-success">{existingTodo? 'Update' : 'Save'}</button>
                </form>

        </div>
    )
}

export default TodoForm;
