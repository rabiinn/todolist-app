import { useState } from "react"

const ToggleForm = ({handleCreateAtodo, handleTitleChange, handleDescriptionChange}) => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <button className="btn btn-primary" onClick={() => setOpen(!open)}>
                {open ? 'Close' : 'Add ToDo'}
            </button>

            {open && (
                <form className="mt-3" onSubmit={handleCreateAtodo}>
                    <input onChange={handleTitleChange} type="text" placeholder="Title" className="form-control mb-2" />
                    <textarea onChange={handleDescriptionChange} placeholder="Description" className="form-control mb-2" />
                    <button type="submit" className="btn btn-success">Save</button>
                </form>
            )}
        </div>
    )
}

export default ToggleForm;
