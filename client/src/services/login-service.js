const baseUrl = 'http://localhost:3001/api/login';


const createlogin = async (credentials) => {
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    if(!response.ok) throw new Error('invalid credentials');
    return await response.json();
}

export default {createlogin}

