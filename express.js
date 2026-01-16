import express from "express";
import { router as userHandlers } from "./src/routes/users.js";
import { router as taskHandlers } from "./src/routes/tasks.js";
import { config } from "dotenv";
import { errorHandler } from "./src/middleswares/error.js";
import { authorizeTaskOwner } from "./src/middleswares/authentication.js";

config();
const app = express();

app.use(express.json()); //Needed for request body || undefined
app.use("/users", userHandlers);
app.use("/tasks", taskHandlers);

// If another endpoint is entered
app.use((req, res, next) => {
    next({
        status: 404,
        message: "Endpoint not found"
    });
});


app.use(errorHandler);

export { app };