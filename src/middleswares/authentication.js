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

    try {
        const secretKey = process.env.SECRET_KEY;
        const payload = jwt.verify(token.trim(), secretKey.trim());

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
// Checking if owner has authorization to access task
export async function authorizeTaskOwner(req, res, next) {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const task = await getTaskById(id);
        if (!task) {
            const error = new Error(`No task with id:${id} was found`)
            error.status = 404;
            return next(error)
        }
        if (task.user_id !== userId) {
            const error = new Error("You are forbidden to access this task");
            error.status = 403;
            return next(error);
        }
        req.task = task;
        next();
    } catch (error) {
        next(error);
    }
};

export async function athorizeRolePermissions(req, res, next) {
    console.log("checking admin permissions");
    const role = req.user.role;

    if (role !== "admin") {
        const error = new Error("You don't have permission to access this resource");
        error.status = 403;
        next(error);
    }
    next();
};