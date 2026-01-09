

import { db } from "../database/connection.js";

async function getAllTasks() {
    const sql = ` SELECT * FROM tasks`;

    const [result] = await db.execute(sql, []);
    return result;
}

async function createTask(taskData) {

    const sql = `INSERT INTO tasks (title, description, status, user_id) VALUES (?, ?, ?, ?)`;
    const values = [taskData.title, taskData.description, taskData.status, taskData.userId];

    const [result] = await db.execute(sql, values);
    return result;
};


export { createTask, getAllTasks };