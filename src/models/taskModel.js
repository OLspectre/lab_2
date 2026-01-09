

import { db } from "../database/connection.js";

async function createTask(taskData) {

    const sql = `INSERT INTO tasks (title, description, status, user_id) VALUES (?, ?, ?, ?)`;
    const values = [taskData.title, taskData.description, taskData.status];

    const [result] = await db.execute(sql, values);
    return result;
};


const testTask = {
    title: "Test of model",
    description: "See if communication with MySQL works to add task",
    status: "completed",
    userId: 1
};

createTask(testTask)
    .then(result => console.log("Success! Rad tillagd med ID:", result.insertId))
    .catch(err => console.error("Det sket sig:", err));