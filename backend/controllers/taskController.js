const connectDb = require("../config/db");

async function getTasks(req, res) {
  try {
    const db = await connectDb();

    const tasks = await db.all(
      "SELECT * FROM tasks WHERE user_id = ? ORDER BY id DESC",
      [req.user.userId]
    );

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch tasks.",
      error: error.message,
    });
  }
}

async function createTask(req, res) {
  try {
    const { title, description, status } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({
        message: "Task title is required.",
      });
    }

    const db = await connectDb();

    const result = await db.run(
      `
      INSERT INTO tasks (user_id, title, description, status)
      VALUES (?, ?, ?, ?)
      `,
      [
        req.user.userId,
        title.trim(),
        description ? description.trim() : "",
        status || "todo",
      ]
    );

    const newTask = await db.get(
      "SELECT * FROM tasks WHERE id = ?",
      [result.lastID]
    );

    res.status(201).json({
      message: "Task created successfully.",
      task: newTask,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create task.",
      error: error.message,
    });
  }
}

async function updateTask(req, res) {
  try {
    const taskId = Number(req.params.id);
    const { title, description, status } = req.body;

    const db = await connectDb();

    const existingTask = await db.get(
      "SELECT * FROM tasks WHERE id = ? AND user_id = ?",
      [taskId, req.user.userId]
    );

    if (!existingTask) {
      return res.status(404).json({
        message: "Task not found.",
      });
    }

    const updatedTitle =
      title !== undefined ? title.trim() : existingTask.title;
    const updatedDescription =
      description !== undefined
        ? description.trim()
        : existingTask.description;
    const updatedStatus =
      status !== undefined ? status : existingTask.status;

    await db.run(
      `
      UPDATE tasks
      SET title = ?, description = ?, status = ?
      WHERE id = ? AND user_id = ?
      `,
      [
        updatedTitle,
        updatedDescription,
        updatedStatus,
        taskId,
        req.user.userId,
      ]
    );

    const updatedTask = await db.get(
      "SELECT * FROM tasks WHERE id = ? AND user_id = ?",
      [taskId, req.user.userId]
    );

    res.status(200).json({
      message: "Task updated successfully.",
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update task.",
      error: error.message,
    });
  }
}

async function deleteTask(req, res) {
  try {
    const taskId = Number(req.params.id);
    const db = await connectDb();

    const existingTask = await db.get(
      "SELECT * FROM tasks WHERE id = ? AND user_id = ?",
      [taskId, req.user.userId]
    );

    if (!existingTask) {
      return res.status(404).json({
        message: "Task not found.",
      });
    }

    await db.run(
      "DELETE FROM tasks WHERE id = ? AND user_id = ?",
      [taskId, req.user.userId]
    );

    res.status(200).json({
      message: "Task deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete task.",
      error: error.message,
    });
  }
}

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};