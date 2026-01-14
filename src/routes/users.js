import express from "express";
import { validateTask, validateUserId, validateParamId } from "../middleswares/validation.js";
import { createTask, getAllTasks, getTaskById, updateTask, deleteTask } from "../models/taskModel.js";
export const router = express.Router();


// /login default route
router.post("/login", async (req, res, next) => {
    console.log("login route");

    res.json({ mesasge: "Trying to login via this route" })
});

router.post("/authorized", async (req, res, next) => {
    console.log("protected route");

    res.json({ mesasge: "You entered restricted area" })
});

