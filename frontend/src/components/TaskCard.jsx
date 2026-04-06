function TaskCard ({ task, onMove, onDelete }) {
    return (
        <article className="task-card">
            <h3>{task.title}</h3>
            <p>{task.description || "No description provided."}</p>

            <button type="button" className="move-button" onClick={() => onMove(task.id)}>Move</button>
            <button type="button" className="delete-button" onClick={() => onDelete(task.id)}>Delete</button>
        </article>
    );
}

export default TaskCard;