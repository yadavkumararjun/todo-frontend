
const BASE_URL = "http://localhost:3000/todos";

export const getTodos = async ()=>{
    const response = await fetch(BASE_URL);
    const data = await response.json();
    if(!response.ok){
        throw new Error("Failed to fetch todos");
    }
    return data;
}

export const addTodo = async (todoData) => {
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(todoData)
    });
    const data = await response.json();
    if(!response.ok){
        throw new Error("Failed to add todo");
    }
    return data;
}

export const deleteTodo = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
    });
    const data = await response.json();
    if(!response.ok){
        throw new Error("Failed to delete todo");
    }
    return data;
}   
export const toggleTodo = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PATCH",    
    });
    const data = await response.json();
    if(!response.ok){
        throw new Error("Failed to toggle todo");
    }
    return data;
} ;