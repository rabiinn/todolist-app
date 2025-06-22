import React, {useRef, useEffect} from "react";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";
import TodoForm from "./TodoForm";


const ModalForm = ({createTodo}) => {
    const modalRef = useRef();

    useEffect(() => {
        modalRef.current = new Modal(document.getElementById('myModal'));
    },[]);

    const openModal = () => {
        modalRef.current.show();
    };

    const closeModal = () => {
        modalRef.current.hide();
    }

    return (
        <div className="container">
            <button className="btn btn-primary" onClick={openModal}>
                Add a ToDo
            </button>

            <div className="modal fade" id="myModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"> React Modal </h5>
                            <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="close"
                            />

                        </div>
                        <div className="modal-body">

                    <TodoForm createTodo={createTodo} closeModal={closeModal}/>
                            
                        </div>
                        <div className="modal-footer">
                            <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                            > 
                            Close
                            </button>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ModalForm;