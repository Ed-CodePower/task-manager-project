import "../styles/Dashboard.css";

function Dashboard() {
    const columns = [
        {id: "todo", title: "To Do"},
        {id: "in-progess", title: "In Progress"},
        {id: "hold", title: "Hold"},
        {id: "done", title: "Done"},
        {id: "revisit", title: "Need Revisit"},
    ];

  return (
    <main className="dashboard">
        <header className="dashboard-header">
            <h1>Task Manager</h1>
            <p>Organize your tasks by progress status.</p>
        </header>

        <section className="task-form-section" aria-labelledby="add-task-heading">
            <h2 id="add-task-heading">Add New Task</h2>

            <form className="task-form">
                <label htmlFor="task-title">Task Title</label>
                <input id="task-title" type="text" placeholder="Enter task title" />

                <label htmlFor="task-description">Description</label>
                <textarea id="task-description" placeholder="Enter task description"></textarea>

                <label htmlFor="task-status">Status</label>
                <select id="task-status">
                    <option>To Do</option>
                    <option>In Progress</option>
                    <option>Hold</option>
                    <option>Done</option>
                    <option>Need Revisit</option>
                </select>

                <button type="submit">Add Task</button>
            </form>
        </section>

        <section className="task-board" aria-label="Task board">
            {columns.map((column) => (
                <section className="task-column" key={column.id} aria-labelledby={column.id}>
                    <h2 id={column.id}>{column.title}</h2>

                    <article className="task-card">
                        <h3>Sample Task</h3>
                        <p>This is sample task card.</p>
                        <button type="button">Move</button>
                    </article>

                    <article className="task-card">
                        <h3>Another Task</h3>
                        <p>This area will later display real tasks from the database.</p>
                        <button type="button">Move</button>
                    </article>
                </section>
            ))}
        </section>
    </main>
  );
}

export default Dashboard