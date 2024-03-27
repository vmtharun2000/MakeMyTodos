const validator = require("../helpers/Validators");

module.exports = {
    validateCreateTodo: (req, res, next) => {
        const { deadLine, data } = req.body;
        const errors = [];

        if (validator.isEmpty(data))
            errors.push({
                field: "deadLine",
                message: "deadline is missing",
            });

        if (!validator.isValidTimestamp(deadLine))
            errors.push({
                field: "deadLine",
                message: "Invalid timestamp",
            });

        if (validator.isEmpty(data))
            errors.push({ field: "data", message: "Data is required or Invalid" });

        if (errors.length > 0)
            return res.status(400).send({
                error: true,
                message: errors,
            });

        next();
    },

    validateUpdateTodo: (req, res, next) => {
        const { todoId, deadLine, data } = req.body;
        const errors = [];

        if (validator.isEmpty(todoId)) {
            errors.push({
                field: "todoId",
                message: "todoId required",
            });
        }

        const isDeadlineProvided = !validator.isEmpty(deadLine);
        const isDataProvided = !validator.isEmpty(data);

        if (!isDeadlineProvided && !isDataProvided)
            errors.push({
                field: "input",
                message: "At least any one data has to be provided",
            });

        if (isDeadlineProvided && !validator.isValidTimestamp(deadLine))
            errors.push({
                field: "deadLine",
                message: "Invalid timestamp",
            });

        if (errors.length > 0)
            return res.status(400).send({
                error: true,
                message: errors,
            });

        next();
    },

    validateUpdateTodoStatus: (req, res, next) => {
        const { status } = req.body;
        const validStatusValues = ["pending", "completed"];
        const errors = [];

        if (!validStatusValues.includes(status))
            errors.push({
                field: "status",
                message: `Only available status is ${validStatusValues}`,
            });

        if (errors.length > 0)
            return res.status(400).send({
                error: true,
                message: errors,
            });

        next();
    },

    validateDeleteTodo: (req, res, next) => {
        const { todoId } = req.body;
        const errors = [];

        if (validator.isEmpty(todoId)) {
            errors.push({
                field: "todoId",
                message: "todoId required",
            });
        }

        if (errors.length > 0)
            return res.status(400).send({
                error: true,
                message: errors,
            });

        next();
    },

    validateViewTodo: (req, res, next) => {
        const { fromDate, toDate } = req.query;
        const errors = [];

        if (!validator.isEmpty(fromDate))
            if (!validator.isValidTimestamp(fromDate))
                errors.push({
                    field: "fromDate",
                    message: "Invalid timestamp",
                });

        if (!validator.isEmpty(toDate))
            if (!validator.isValidTimestamp(toDate))
                errors.push({
                    field: "toDate",
                    message: "Invalid timestamp",
                });

        if (errors.length > 0)
            return res.status(400).send({
                error: true,
                message: errors,
            });

        next();
    },
};
