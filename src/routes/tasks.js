import express from "express";
import { validateTask } from "../middleswares/validation.js";
import { createTask, getAllTasks } from "../models/taskModel.js";
export const router = express.Router();


router.get("/", async (req, res, next) => {
    try {
        const tasks = await getAllTasks();
        console.log(tasks);
        res.status(200).json({ message: "Retrieved all tasks:", tasks });

    } catch (error) {
        next(error);
    }
});

router.post("/", validateTask, async (req, res, next) => {
    try {
        const result = await createTask(req.body); // Recieves SQL metadata, not actual created task
        const task = {
            id: result.insertId,
            ...req.body
        };
        console.log(task);

        res.status(201).json({ message: "Successfully added a new task", task });
    } catch (error) {
        next(error)
    }
});