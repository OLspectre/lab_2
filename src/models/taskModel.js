

import { db } from "../database/connection.js";

async function updateTask(id, data) {

    const sql = `
        UPDATE
            tasks
        SET
            title = ?,
            description = ?,
            status = ?
        WHERE
            id = ?
        `;

    const values = [data.title, data.description, data.status, id]
    const [result] = await db.execute(sql, values)
    return result;
};

async function getTaskById(id) {
    const sql = `
    SELECT 
        * 
    FROM 
        tasks 
    WHERE 
        id = ?
    `;

    const [result] = await db.execute(sql, [id]);
    return result[0];
}

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


export { createTask, getAllTasks, getTaskById, updateTask };