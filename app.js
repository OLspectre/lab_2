import { app } from "./express.js";
import { db } from "./src/database/connection.js";
const PORT = process.env.PORT || 3000;


(async function startServer() {

    try {
        const [result] = await db.query("SELECT 'connected' AS status"); // SIMULATED TEST to se if database is connected correctly.

        console.log("db response:", result);
        console.log("Database connection was successful!");
        app.listen(PORT, (err) => {
            (err)
                ? console.error("Server failed to start", err)
                : console.log(`Server running on port ${PORT}`);
        });
    }
    catch (err) {
        console.error("Database connection was NOT successful", err.message);
    }
})();