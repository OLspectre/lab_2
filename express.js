
import express from "express";
import { router as userHandlers } from "./src/routes/users.js";
import { router as taskHandlers } from "./src/routes/tasks.js";
import { config } from "dotenv";

config();
const app = express();

app.use(express.json()); //Needed for request body || undefined
app.use("/users", userHandlers);
app.use("/tasks", taskHandlers);

export { app };