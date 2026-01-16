// Validation for PUT, DELETE, GET:id

const validateLoginInput = (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        const error = new Error("username or password is missing");
        error.status = 400;
        return next(error);
    }
    next();
};

const validateParamId = (req, res, next) => {
    const { id } = req.params;
    const parsedId = parseInt(id);

    if (isNaN(parsedId) || parsedId <= 0) {
        return next({ status: 400, message: "URL id must be a positive valid integer" });
    }
    req.params.id = parsedId;
    next();
};

const validateTask = (req, res, next) => {
    const { title, description, status } = req.body;
    let missingFields = [];

    if (!title || title.trim().length === 0) missingFields.push("title");
    if (!description || description.trim().length === 0) missingFields.push("description");
    if (!status || status.trim().length === 0) missingFields.push("status");

    if (missingFields.length > 0) {
        const message = `Missing or empty fields: ${missingFields.join(", ")}`;
        const error = new Error(message);
        error.status = 400;
        return next(error);
    }
    next();
};

export { validateTask, validateParamId, validateLoginInput };