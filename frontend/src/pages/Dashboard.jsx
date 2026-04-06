import { useState } from "react";
import "../styles/Dashboard.css";

function Dashboard() {
    const statusList = [
        {id: "todo", title: "To Do"},
        {id: "in-progress", title: "In Progress"},
        {id: "hold", title: "Hold"},
        {id: "done", title: "Done"},
        {id: "revisit", title: "Need Revisit"},
    ];

    const [ tasks, setTasks ] = useState([
        {
            id: 1,
            title: "Finish React Layout",
            description: "Build the task board and form",
            status: "todo",
        },
        {
            id: 2,
            title: "Plan backend structure",
            description: "Prepare routes, models, and controllers",
            status: "in-progress",
        },
        {
            id: 3,
            title: "Review project requirements",
            description: "Check rubric and deliverables",
            status: "hold",
        },
    ]);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "todo",
    });

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((currentData) => ({
            ...currentData,
            [name]: value,
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();

        if(formData.title.trim() === ""){
            alert("Task title is required.");
            return;
        }

        const newTask = {
            id: Date.now(),
            title: formData.title.trim(),
            description: formData.description.trim(),
            status: formData.status,
        };

        setTasks((currentTasks) => [...currentTasks, newTask]);

        setFormData({
            title: "",
            description: "",
            status: "todo",
        });
    }

    function handleMove(taskId){
        setTasks((currentTasks) =>
            currentTasks.map((task) => {
                if(task.id !== taskId){
                    return task;
                }

                const currentIndex = statusList.findIndex(
                    (statusItem) => statusItem.id === task.status
                );

                const nextIndex = (currentIndex + 1) % statusList.length;

                return{
                    ...task,
                    status: statusList[nextIndex].id,
                };
            })
        );
    }

    function handleDelete(taskId){
        setTasks((currentTasks) => 
            currentTasks.filter((task) => task.id !== taskId)
        );
    }

  return (
    <main className="dashboard">
        <header className="dashboard-header">
            <h1>Task Manager</h1>
            <p>Organize your tasks by progress status.</p>
        </header>

        <section className="task-form-section" aria-labelledby="add-task-heading">
            <h2 id="add-task-heading">Add New Task</h2>

            <form className="task-form" onSubmit={handleSubmit}>
                <label htmlFor="task-title">Task Title</label>
                <input id="task-title" name="title" type="text" placeholder="Enter task title" value={formData.title} onChange={handleChange} />

                <label htmlFor="task-description">Description</label>
                <textarea id="task-description" name="description" placeholder="Enter task description" value={formData.description} onChange={handleChange}></textarea>

                <label htmlFor="task-status">Status</label>
                <select id="task-status" name="status" value={formData.status} onChange={handleChange}>
                    {statusList.map((statusItem) => (
                        <option key={statusItem.id} value={statusItem.id}>
                            {statusItem.title}
                        </option>
                    ))}
                </select>

                <button type="submit">Add Task</button>
            </form>
        </section>

        <section className="task-board" aria-label="Task board">
            {statusList.map((statusItem) => {
                const filteredTasks = tasks.filter(
                    (task) => task.status === statusItem.id
                );

                return (
                    <section className="task-column" key={statusItem.id} aria-labelledby={statusItem.id}>
                        <h2 id={statusItem.id}>{statusItem.title}</h2>
                        {filteredTasks.length === 0 ? (
                            <p className="empty-message">No tasks in this section.</p>
                        ) : (
                            filteredTasks.map((task) => (
                                <article className="task-card" key={task.id}>
                                    <h3>{task.title}</h3>
                                    <p>{task.description || "No description provided."}</p>

                                    <button type="button" className="move-button" onClick={() => handleMove(task.id)}>Move</button>

                                    <button type="button" className="delete-button" onClick={() => handleDelete(task.id)}>Delete</button>
                                </article>
                            ))
                        )}
                    </section>
                );
            })}
        </section>
    </main>
  );
}

export default Dashboard