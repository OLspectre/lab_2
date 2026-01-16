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

    if (!title || title.trim().length === 0 || !description || !status) {
        const error = new Error("One or more required fields missing");
        error.status = 400;
        return next(error);
    }
    next();
};

export { validateTask, validateParamId, validateLoginInput };