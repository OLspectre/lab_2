import jwt from "jsonwebtoken";
import { getTaskById } from "../models/taskModel.js";

// Authenticate JWT from headers
export function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        const error = new Error("Authentication credentials are required");
        error.status = 401; // not authorized
        return next(error);
    }
    const token = authHeader.replace("Bearer ", "");
    console.log("TOKEN:", token);

    try {
        console.log("Trying with token");

        const secretKey = process.env.SECRET_KEY;
        console.log("secret key:", secretKey);

        const payload = jwt.verify(token.trim(), secretKey.trim());
        console.log(payload);

        req.user = payload;
        console.log("User is authenticated correctly");

        next()
    } catch (err) { // TokenExpiredError

        let status = 401;
        let message = "jwt token is missing or invalid"

        if (err.name === "TokenExpiredError") {
            message = "jwt token expired";
        }
        err.status = status;
        err.message = message;
        next(err);
    }
};

export async function authorizeTaskOwner(req, res, next) {
    console.log("trying to check ids");

    try {
        const { id } = req.params;
        console.log("first ID:", id);
        const userId = req.user.id;
        console.log("current user", userId);


        const task = await getTaskById(id);

        if (task.user_id !== userId) {
            const error = new Error("You are forbidden to access this task");
            error.status = 403;
            throw error;
        }
        console.log("ID of user matches task's user_id");
        req.task = task;
        next();
    } catch (error) {
        next(error);
    }
};