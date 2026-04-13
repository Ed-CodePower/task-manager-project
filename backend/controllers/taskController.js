let tasks = [
    {
        id: 1,
        title: "Finish React frontend",
        description: "Complete dashboard layout and routing",
        status: "todo",
    },
    {
        id: 2,
        title: "Set up backend",
        description: "Build Express routes and controllers",
        status: "in-progress",
    },
];

function getTasks(req, res) {
    res.status(200).json(tasks);
}

function createTask(req, res) {
    const { title, description, status } = req.body;

    if(!title || title.trim() === "") {
        return res.status(400).json ({
            message: "Task title is required.",
        });
    }

    const newTask = {
        id: Date.now(),
        title: title.trim(),
        description: description ? description.trim() : "",
        status: status || "todo",
    };

    tasks.push(newTask);

    res.status(201).json({
        message: "Task created successfully.",
        task: newTask,
    });
}

function updateTask(req, res){
    const taskId = Number(req.params.id);
    const { title, description, status } = req.body;

    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex === -1){
        return res.status(404).json({
            message: "Task not found.",
        });
    }

    tasks[taskIndex] = {
        ...tasks[taskIndex],
        title: title !== undefined ? title.trim() : tasks[taskIndex].title,
        description:
            description !== undefined
            ? description.trim()
            : tasks[taskIndex].description,
        status: status !== undefined ? status: tasks[taskIndex].status,
    };

    res.status(200).json({
        message: "Task updated successfully.",
        task: tasks[taskIndex],
    });
}

function deleteTask(req, res) {
    const taskId = Number(req.params.id);

    const existigTask = tasks.find((task) => task.id === taskId);

    if (!existingTask){
        return res.status(404).json({
            message: "Task not found.",
        });
    }

    tasks = tasks.filter((task) => task.id !== taskId);

    res.status(200).json({
        message: "Task deleted successfullly.",
    });
}

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
};