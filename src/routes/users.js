import express from "express";
import { validateTask, validateUserId, validateParamId, validateLoginInput } from "../middleswares/validation.js";
import { authenticateJWT } from "../middleswares/authentication.js";
import { createTask, getAllTasks, getTaskById, updateTask, deleteTask } from "../models/taskModel.js";
import { findUserByUsername } from "../models/userModel.js";
export const router = express.Router();
import jwt from "jsonwebtoken";


// /login default route
router.post("/login", validateLoginInput, async (req, res, next) => {
    console.log("login route");
    const username = req.body.username;
    const password = req.body.password;

    let jwtToken;
    try {

        jwtToken = await login(username, password);

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


async function login(username, password) {
    console.log(`username: ${username} password: ${password}`);
    const user = await findUserByUsername(username);

    if (!user || user.password !== password) {
        if (user) console.log("user found but incorrect password"); //Only for debug

        const error = new Error("User credentials are invalid"); // Checking if user with username is in hte database + password
        error.status = 401;
        throw error;
    }

    const payload = {
        id: user.id,
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



// Endedpoint for tesing authorization only --> Use authenticateJWT to wanted task endpoints
router.get("/authorized", authenticateJWT, async (req, res, next) => {
    console.log("protected route");

    res.status(200).json({
        mesasge: "You entered restricted area",
        loggedIn: req.user
    });
});

