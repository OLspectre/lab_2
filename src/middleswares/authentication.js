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
        req.user = payload;
        next()
    } catch (err) { // TokenExpiredError
        if (err.name === "TokenExpiredError") {
            err.status = 401;
            err.message = "jwt token expired";
        } else { //JsonWebTokenError
            err.status = 401;
            err.message = "jwt token is missing or invalid";
        }
        next(err);
    }
}

