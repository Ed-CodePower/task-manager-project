const pool = require("../config/db");

// GET all tasks for logged-in user
async function getTasks(req, res) {
  try {
    const result = await pool.query(
      "SELECT * FROM tasks WHERE user_id = $1 ORDER BY id DESC",
      [req.user.userId]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("GET TASKS ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch tasks.",
      error: error.message,
    });
  }
}

// CREATE new task
async function createTask(req, res) {
  try {
    const { title, description, status } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({
        message: "Task title is required.",
      });
    }

    const result = await pool.query(
      `INSERT INTO tasks (user_id, title, description, status)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [
        req.user.userId,
        title.trim(),
        description ? description.trim() : "",
        status || "todo",
      ]
    );

    res.status(201).json({
      message: "Task created successfully.",
      task: result.rows[0],
    });
  } catch (error) {
    console.error("CREATE TASK ERROR:", error);

    res.status(500).json({
      message: "Failed to create task.",
      error: error.message,
    });
  }
}

// UPDATE task
async function updateTask(req, res) {
  try {
    const taskId = Number(req.params.id);
    const { title, description, status } = req.body;

    const existing = await pool.query(
      "SELECT * FROM tasks WHERE id = $1 AND user_id = $2",
      [taskId, req.user.userId]
    );

    if (existing.rows.length === 0) {
      return res.status(404).json({
        message: "Task not found.",
      });
    }

    const updated = await pool.query(
      `UPDATE tasks
       SET title = $1,
           description = $2,
           status = $3
       WHERE id = $4 AND user_id = $5
       RETURNING *`,
      [
        title ?? existing.rows[0].title,
        description ?? existing.rows[0].description,
        status ?? existing.rows[0].status,
        taskId,
        req.user.userId,
      ]
    );

    res.status(200).json({
      message: "Task updated successfully.",
      task: updated.rows[0],
    });
  } catch (error) {
    console.error("UPDATE TASK ERROR:", error);

    res.status(500).json({
      message: "Failed to update task.",
      error: error.message,
    });
  }
}

// DELETE task
async function deleteTask(req, res) {
  try {
    const taskId = Number(req.params.id);

    const existing = await pool.query(
      "SELECT * FROM tasks WHERE id = $1 AND user_id = $2",
      [taskId, req.user.userId]
    );

    if (existing.rows.length === 0) {
      return res.status(404).json({
        message: "Task not found.",
      });
    }

    await pool.query(
      "DELETE FROM tasks WHERE id = $1 AND user_id = $2",
      [taskId, req.user.userId]
    );

    res.status(200).json({
      message: "Task deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE TASK ERROR:", error);

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