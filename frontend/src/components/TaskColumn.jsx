import TaskCard from "./TaskCard"

function TaskColumn ({ statusItem, tasks, onMove, onDelete }) {
    return (
        <section className="task-column" aria-labelledby={statusItem.id}>
            <h2 id={statusItem.id}>{statusItem.title}</h2>

            {tasks.length === 0 ? (
                <p className="empty-message">No tasks in this section.</p>
            ) : (
                tasks.map((task) => (
                    <TaskCard key={tasks.id} task={task} onMove={onMove} onDelete={onDelete} />
                ))
            )}
        </section>
    );
}

export default TaskColumn;