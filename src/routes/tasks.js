import express from "express";
//Validation logic
import { validateTask, validateParamId } from "../middleswares/validation.js";
// Database operations of tasks
import { createTask, getAllTasks, getTaskById, updateTask, deleteTask } from "../models/taskModel.js";
// Authentication
import { authenticateJWT, authorizeTaskOwner } from "../middleswares/authentication.js";
export const router = express.Router();


router.get("/:id", validateParamId, authenticateJWT, authorizeTaskOwner, async (req, res, next) => {

    try {
        const { id } = req.params;
        console.log(id);

        const task = await getTaskById(id);


        if (!task) {
            const error = new Error("No task with specified id was found")
            error.status = 404;
            next(error)
        }
        console.log(task);
        res.status(200).json(task);

    } catch (error) {
        next(error);
    }

});

router.get("/", async (req, res, next) => {
    try {
        const tasks = await getAllTasks();
        console.log(tasks);
        res.status(200).json(tasks);

    } catch (error) {
        next(error);
    }
});

router.post("/", authenticateJWT, validateTask, async (req, res, next) => {
    try {
        const taskData = {
            ...req.body,
            userId: req.user.id
        }

        const result = await createTask(taskData); // Recieves SQL metadata, not actual created task
        const task = {
            id: result.insertId,
            ...taskData
        };
        console.log(task);

        res.status(201).json({ message: "Successfully added a new task", task });
    } catch (error) {
        next(error)
    }
});

router.put("/:id", validateTask, validateParamId, authenticateJWT, authorizeTaskOwner, async (req, res, next) => {

    try {
        const { id } = req.params;

        const result = await updateTask(id, req.body);

        if (!result) {
            const error = new Error("No task with specified id was found");
            error.status = 404;
            throw error;
        }
        const updatedTask = await getTaskById(id);
        res.status(200).json(updatedTask);

    } catch (error) {
        next(error);
    }
});

router.delete("/:id", validateParamId, authenticateJWT, authorizeTaskOwner, async (req, res, next) => {
    try {
        const { id } = req.params;
        const taskToDelete = await getTaskById(id);

        if (!taskToDelete) {
            const error = new Error("Task not found");
            error.status = 404;
            throw error;
        }
        await deleteTask(id);
        res.status(200).json({ message: "Task deleted successfully" });

    } catch (error) {
        next(error)
    }
});