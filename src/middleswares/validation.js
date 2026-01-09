

const validateTask = (req, res, next) => {
    const { title, userId } = req.body;

    const parsedId = parseInt(userId);

    if (!title || title.trim().length === 0) {
        return next({ status: 400, message: "Title is required" });
    }

    if (!userId || isNaN(parsedId) || parsedId <= 0) {
        return next({ status: 400, message: "A valid user id is required" })
    }
    req.body.userId = parsedId;
    next();
};

export { validateTask };