
import express from "express";
import { router as userRouter } from "./src/routes/users.js";
import { router as tasksRouter } from "./src/routes/tasks.js";
import { config } from "dotenv";

config();
const app = express();

app.use(express.json()); //Needed for request body || undefined
app.use("/users", userRouter);
app.use("/tasks", tasksRouter);

export { app };