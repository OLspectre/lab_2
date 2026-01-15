import jwt from "jsonwebtoken";

// Authenticate JWT from headers
export function authenticateJWT(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        const error = new Error("JWT token is missing");
        error.status = 401; // not authorized
        next(error);
    }

    try {
        const payload = jwt.verify(token, "SPECIAL KEY");
    } catch (err) {
        next(err);
    }
    next()
}

