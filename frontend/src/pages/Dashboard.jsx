import { useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskColumn from "../components/TaskColumn";
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

        <TaskForm formData={formData} statusList={statusList} onChange={handleChange} onSubmit={handleSubmit} />

        <section className="task-board" aria-label="Task board">
            {statusList.map((statusItem) => {
                const filteredTasks = tasks.filter(
                    (task) => task.status === statusItem.id
                );

                return (
                    <TaskColumn key={statusItem.id} statusItem={statusItem} tasks={filteredTasks} onMove={handleMove} onDelete={handleDelete} />
                );
            })}
        </section>
    </main>
  );
}

export default Dashboard