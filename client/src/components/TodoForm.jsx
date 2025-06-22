import { useState } from "react";

const TodoForm = ({createTodo, closeModal}) => {

    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');

    const handleTitleChange = async (event) =>{
    setNewTitle(event.target.value);
  }
  const handleDescriptionChange = async (event) => {
    setNewDescription(event.target.value);
  }

   const handleCreateAtodo = async () => {
      try {
          await createTodo({title: newTitle, description: newDescription})
          setNewTitle('');
          setNewDescription('');
          return true
      }
      catch(error){
        console.log(error);
        return false
      }
  
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        const success = await handleCreateAtodo();
        if(success) {
            closeModal();
        }
    }
    return (
        <div>
                <form className="mt-3" onSubmit={onSubmit}>
                    <input onChange={handleTitleChange} type="text" placeholder="Title" className="form-control mb-2" />
                    <textarea onChange={handleDescriptionChange} placeholder="Description" className="form-control mb-2" />
                    <button type="submit" className="btn btn-success">Save</button>
                </form>

        </div>
    )
}

export default TodoForm;
