import express from "express";
import { validateTask, validateUserId, validateParamId, validateLoginInput } from "../middleswares/validation.js";
import { authenticateJWT } from "../middleswares/authentication.js";
import { createTask, getAllTasks, getTaskById, updateTask, deleteTask } from "../models/taskModel.js";
export const router = express.Router();
import jwt from "jsonwebtoken";


// /login default route
router.post("/login", validateLoginInput, (req, res, next) => {
    console.log("login route");
    const username = req.body.username;
    const password = req.body.password;

    let jwtToken;
    try {

        jwtToken = login(username, password);

    } catch (error) {
        return next(error);
    }

    res.json({
        type: "success",
        mesasge: "User was authenticated correctly",
        token: jwtToken,
        payload: jwt.decode(jwtToken)
    })
});


function login(username, password) {
    console.log(username, password);

    if (username !== "admin" || password !== "password123") {
        const error = new Error("User and password does not match");
        error.status = 401;
        throw error;
    }

    const payload = {
        iss: "Issue id",
        sub: username,
        username,
    }

    const options = {
        expiresIn: "15m"
    }

    const token = jwt.sign(payload, "SPECIAL KEY", options);
    return token;
};


router.get("/authorized", authenticateJWT, async (req, res, next) => {
    console.log("protected route");

    res.json({ mesasge: "You entered restricted area" })
});

