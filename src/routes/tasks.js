import express from "express";
//Validation logic
import { validateTask, validateParamId } from "../middleswares/validation.js";
// Database operations of tasks
import { createTask, getAllTasks, getTaskById, updateTask, deleteTask } from "../models/taskModel.js";
// Authentication
import { authenticateJWT, authorizeTaskOwner, athorizeRolePermissions } from "../middleswares/authentication.js";
export const router = express.Router();

//GET TASK BY ID
router.get("/:id", validateParamId, authenticateJWT, authorizeTaskOwner, async (req, res, next) => {
    try {
        res.status(200).json(req.task);
    } catch (error) {
        next(error);
    }
});

// GET ALL TASKS
router.get("/", authenticateJWT, athorizeRolePermissions, async (req, res, next) => {
    try {
        const tasks = await getAllTasks();
        if (!tasks || tasks.length() === 0) { // if database is empty
            const error = new Error("The database is empty");
            error.status = 400;
            next(error);
        }
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
});

// CREATE A NEW TASK
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

        res.status(201).json({ message: "Successfully added a new task", task });
    } catch (error) {
        next(error);
    }
});

// REPLACE DATA OF A TASK
router.put("/:id", authenticateJWT, authorizeTaskOwner, validateTask, validateParamId, async (req, res, next) => {

    try {
        const { id } = req.params;
        await updateTask(id, req.body);

        const updatedTask = await getTaskById(id);
        res.status(200).json(updatedTask);
    } catch (error) {
        next(error);
    }
});

// DELETE A TASK
router.delete("/:id", validateParamId, authenticateJWT, authorizeTaskOwner, async (req, res, next) => {
    try {
        await deleteTask(req.task.id);
        res.status(200).json({
            message: "Task deleted successfully",
            deletedTask: req.task
        });
    } catch (error) {
        next(error)
    }
});