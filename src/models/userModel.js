
import { db } from "../database/connection.js";

export async function findUserByUsername(username) {

    const sql = `
        SELECT 
            *
        FROM
            users
        WHERE
            username = ?
        `;

    const [result] = await db.execute(sql, [username])
    return result[0];
}