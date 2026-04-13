const API_URL = "http://localhost:5000/api";

// --- AUTH ---
export async function loginUser(data) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "Post",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(data),
    });

    return response.json();
}

export async function registerUser(data) {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return response.json();
}

// --- Tasks ---
// Get tasks
export async function getTasks(token) {
    const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    return response.json();
}

// Create new task
export async function createTask (task, token) {
    const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(task),
    });

    return response.json();
}


// Update task by id
export async function updateTask (id, task, token) {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(task),
    });

    return response.json();
}

// Delete Task by id
export async function deleteTask (id, token) {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    });

    return response.json();
}