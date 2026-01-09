import express from "express";
import { validateTask, validateUserId, validateParamId } from "../middleswares/validation.js";
import { createTask, getAllTasks, getTaskById, updateTask } from "../models/taskModel.js";
export const router = express.Router();


router.get("/:id", validateParamId, async (req, res, next) => {

    try {
        const { id } = req.params;
        console.log(id);

        const task = await getTaskById(id);


        if (!task) {
            return next({ status: 404, message: "No task with specified id was found" });
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
        res.status(200).json({ message: "Retrieved all tasks:", tasks });

    } catch (error) {
        next(error);
    }
});

router.post("/", validateTask, validateUserId, async (req, res, next) => {
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

router.put("/:id", validateTask, validateParamId, async (req, res, next) => {

    try {
        const { id } = req.params;

        const result = await updateTask(id, req.body);
        if (result.affectedRows === 0) {
            return next({ status: 404, message: "No task with specified id was found" });
        }
        const updatedTask = await getTaskById(id);
        res.status(200).json(updatedTask);

    } catch (error) {
        next(error);
    }
});