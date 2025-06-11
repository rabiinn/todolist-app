
const TodoForm = ({handleCreateAtodo, handleTitleChange, handleDescriptionChange}) => {

    return (
        <div>
                <form className="mt-3" onSubmit={handleCreateAtodo}>
                    <input onChange={handleTitleChange} type="text" placeholder="Title" className="form-control mb-2" />
                    <textarea onChange={handleDescriptionChange} placeholder="Description" className="form-control mb-2" />
                    <button type="submit" className="btn btn-success">Save</button>
                </form>

        </div>
    )
}

export default TodoForm;
