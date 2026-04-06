function TaskForm({ formData, statusList, onChange, onSubmit }) {
    return (
        <section className="task-form-section" aria-labelledby="add-task-heading">
            <h2 id="add-task-heading">Add New Task</h2>

            <form className="task-form" onSubmit={onSubmit}>
                <label htmlFor="task-title">Task Title</label>
                <input id="task-title" name="title" type="text" placeholder="Enter task title" value={formData.title} onChange={onChange} />

                <label htmlFor="task-description">Description</label>
                <textarea id="task-description" name="description" placeholder="Enter task description" value={formData.description} onChange={onChange} />

                <label htmlFor="task-status">Status</label>
                <select id="task-status" name="status" value={formData.status} onChange={onChange}>
                    {statusList.map((statusItem) => (
                    <option key={statusItem.id} value={statusItem.id}>
                        {statusItem.title}
                    </option>
                ))}
                </select>

                <button type="submit">Add Task</button>
            </form>
        </section>
    );
}

export default TaskForm;