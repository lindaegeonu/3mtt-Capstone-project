const API_URL = "http://localhost:3000/api";
fetchTasks();
async function signup() {
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    if (!name || !email || !password) {
        alert("All fields are required!");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/auth/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();
        if (response.ok) {
            alert(data.msg);
        } else {
            alert(data.msg || "Signup failed!");
        }
    } catch (err) {
        console.error(err);
        alert("An error occurred while signing up!");
    }
}

async function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) {
        alert("All fields are required!");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem("token", data.token);
            alert(data.msg);
            getProfile();
            fetchTasks();
        } else {
            alert(data.msg || "Login failed!");
        }
    } catch (err) {
        console.error(err);
        alert("An error occurred while logging in!");
    }
}

async function addTask() {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Please log in to add tasks.");
        return;
    }

    const taskName = document.getElementById('taskName').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const taskDueDate = document.getElementById('taskDueDate').value;
    const taskPriority = document.getElementById('taskPriority').value;

    if (!taskName.trim()) {
        alert("Task name is required!");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ taskName, taskDescription, taskDueDate, taskPriority })
        });

        const data = await response.json();
        if (response.ok) {
            alert("Task added successfully!");
            fetchTasks();
        } else {
            alert(data.msg || "Failed to add task!");
        }
    } catch (err) {
        console.error(err);
        alert("An error occurred while adding the task!");
    }
}

async function getProfile() {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Please log in to view your profile.");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/profile`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();
        if (response.ok) {
            console.log(data.user);
            alert(`Welcome, ${data.user.name}`);
        } else {
            alert(data.msg || "Failed to fetch profile!");
        }
    } catch (err) {
        console.error(err);
        alert("An error occurred while fetching the profile!");
    }
}

async function fetchTasks() {
    try {
        const response = await fetch(`${API_URL}/tasks`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await response.json();
        if (response.ok) {
            displayTasks(data.tasks);
        } else {
            alert(data.msg || "Failed to fetch tasks.");
        }
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
}

// Display tasks on the page
function displayTasks(tasks) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // Clear previous tasks
    tasks.forEach((task) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <strong>${task.name}</strong><br>
            <em>Description:</em> ${task.description} <br>
            <em>Priority:</em> ${task.priority || 'Medium'} <br>
            <em>Due Date:</em> ${task.dueDate || 'Not Set'} <br>
            <em>Status:</em> ${task.status || 'Pending'} <br>
            <button onclick="deleteTask('${task._id}')">Delete</button>
            <button onclick="updateTaskStatus('${task._id}')">${task.status === 'done' ? 'Mark as Pending' : 'Mark as Done'}</button>
        `;
        taskList.appendChild(listItem);
    });
}

// Update task status to 'done'
async function updateTaskStatus(taskId) {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Please log in to update task status.");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/tasks/${taskId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();
        if (response.ok) {
            alert("Task status updated!");

            // Toggle the task's styles based on its new status
            if (data.task.status === "done") {
                taskElement.classList.add("completed");
            } else {
                taskElement.classList.remove("completed");
            }

            fetchTasks();  // Refresh the task list
        } else {
            alert(data.msg || "Failed to update task status.");
        }
    } catch (err) {
        console.error(err);
        alert("An error occurred while updating task status!");
    }
}

// Delete task
async function deleteTask(taskId) {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Please log in to delete tasks.");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/tasks/${taskId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();
        if (response.ok) {
            alert("Task deleted successfully!");
            fetchTasks();  // Refresh the task list
        } else {
            alert(data.msg || "Failed to delete task.");
        }
    } catch (err) {
        console.error(err);
        alert("An error occurred while deleting the task!");
    }
}


