import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/api";
import TaskForm from "../components/TaskForm";
import TaskColumn from "../components/TaskColumn";
import "../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const statusList = [
    { id: "todo", title: "To Do" },
    { id: "in-progress", title: "In Progress" },
    { id: "hold", title: "Hold" },
    { id: "done", title: "Done" },
    { id: "revisit", title: "Need Revisit" },
  ];

  const [tasks, setTasks] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "todo",
  });

  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if(!token){
      navigate("/");
    }
  }, []);

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchTasks() {
      try {
        if (!token) {
          navigate("/");
          return;
        }

        const data = await getTasks(token);

        if (Array.isArray(data)) {
          setTasks(data);
        } else {
          setTasks([]);
        }
      } catch (error) {
        console.error("Failed to load tasks:", error.message);
        alert(error.message);

        localStorage.removeItem("token");
        navigate("/");
      }
    }

    fetchTasks();
  }, [token, navigate]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (formData.title.trim() === "") {
      alert("Task title required");
      return;
    }

    try {
      if (editingTaskId) {
        const updated = await updateTask(editingTaskId, formData, token);

        setTasks((prev) =>
          prev.map((task) =>
            task.id === editingTaskId ? updated.task : task
          )
        );

        setEditingTaskId(null);
      } else {
        const data = await createTask(formData, token);
        setTasks((prev) => [...prev, data.task]);
      }

      setFormData({
        title: "",
        description: "",
        status: "todo",
      });
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleMove(id) {
    try {
      const task = tasks.find((task) => task.id === id);

      const currentIndex = statusList.findIndex(
        (statusItem) => statusItem.id === task.status
      );

      const nextStatus =
        statusList[(currentIndex + 1) % statusList.length].id;

      const updated = await updateTask(
        id,
        { ...task, status: nextStatus },
        token
      );

      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updated.task : task))
      );
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteTask(id, token);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      alert(error.message);
    }
  }

  function handleEdit(task) {
    setEditingTaskId(task.id);
    setFormData({
      title: task.title,
      description: task.description,
      status: task.status,
    });
  }

  function handleCancelEdit() {
    setEditingTaskId(null);
    setFormData({
      title: "",
      description: "",
      status: "todo",
    });
  }

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <h1>Task Manager</h1>
        <p>Organize your tasks by progress status.</p>
      </header>

      <TaskForm
        formData={formData}
        statusList={statusList}
        onChange={handleChange}
        onSubmit={handleSubmit}
        editingTaskId={editingTaskId}
        onCancelEdit={handleCancelEdit}
      />

      <section className="task-board" aria-label="Task board">
        {statusList.map((statusItem) => {
          const filteredTasks = tasks.filter(
            (task) => task.status === statusItem.id
          );

          return (
            <TaskColumn
              key={statusItem.id}
              statusItem={statusItem}
              tasks={filteredTasks}
              onMove={handleMove}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Dashboard;