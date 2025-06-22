const baseUrl = 'http://localhost:3001/api/todos';
let token = null;

const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}
const getAll = async () => {
    const response = await fetch(baseUrl, {
        method: 'GET',
        headers:{
            'Content-type': 'application/json',
            'Authorization': token
        }
    });
    if(!response.ok) throw new Error("Unable to fetch the todos");
    const todos = await response.json();
    return todos;
}

const create =  async (newObject) => {
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(newObject)
    });
    if(!response.ok) throw new Error("Not able to create the todo");

    return  await response.json();
}

const update = async (id, newObject) => {
    const response = await fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(newObject)
    });
    if(!response.ok) throw new Error("Not able to update the todo");
    return await response.json();
}

const deleteTodo = async (id) => {
    const response = await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': token
        }
    
    })

    if(!response.ok) throw new Error("Not able to delete the todo");
}


export default {getAll, create, update, deleteTodo, setToken};

