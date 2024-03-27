const Profile = require("../models/Profile");
const TodoListScheme = require("../models/Todo");
const utils = require("../helpers/Utils");
const Todo = require("../models/Todo");
const validator = require("../helpers/Validators");

module.exports = {
    createTodo: (req, res) => {
        try {
            const { deadLine, data } = req.body;
            const user = req.user.data;

            if (!validator.isEmpty(user))
                Profile.findOne({
                    $or: [{ username: user }, { email: user }, { phoneNumber: user }],
                }).then((result) => {
                    if (result) {
                        const todoId = utils.generateTodoId();

                        const TodoData = new TodoListScheme({
                            todoId: todoId,
                            userId: result.userId,
                            deadLine: deadLine,
                            data: data,
                        });

                        TodoData.save().then(() =>
                            res.status(200).send({
                                error: false,
                                message: "Todo has successfully created" + todoId,
                            })
                        );
                    } else
                        return res.status(400).send({
                            error: true,
                            message: "User is not exist",
                        });
                });
            else
                return res.status(400).send({
                    error: true,
                    message: "Unauthorized",
                });
        } catch (error) {
            return res.status(500).send({
                error: true,
                message: error.message,
            });
        }
    },
    updateTodo: (req, res) => {
        try {
            const { todoId, deadLine, data } = req.body;
            const user = req.user.data;
            const update = {};

            if (!validator.isEmpty(deadLine)) update.deadLine = deadLine;
            if (!validator.isEmpty(data)) update.data = data;
            if (!validator.isEmpty(user)) {
                const userFilter = {
                    $or: [{ username: user }, { email: user }, { phoneNumber: user }],
                };

                Profile.findOne(userFilter).then((result) => {
                    if (validator.isEmpty(result))
                        return res.status(400).send({
                            error: true,
                            message: "no user available",
                        });

                    const filter = {
                        $and: [{ todoId: todoId }, { userId: result.userId }],
                    };

                    Todo.findOneAndUpdate(filter, { $set: update }, { new: true }).then(
                        (result) => {
                            if (validator.isEmpty(result))
                                return res.status(400).send({
                                    error: true,
                                    message: "Invalid todo Id",
                                });

                            return res.status(200).send({
                                error: false,
                                message: "Data updated successfully",
                                data: result,
                            });
                        }
                    );
                });
            } else
                return res.status(400).send({
                    error: true,
                    message: "Unauthorized",
                });
        } catch (error) {
            return res.status(500).send({
                error: true,
                message: error.message,
            });
        }
    },
    updateTodoStatus: (req, res) => {
        try {
            const { todoId, status } = req.body;
            const user = req.user.data;
            const update = { status: status };

            if (!validator.isEmpty(user)) {
                const userFilter = {
                    $or: [{ username: user }, { email: user }, { phoneNumber: user }],
                };

                Profile.findOne(userFilter).then((result) => {
                    if (validator.isEmpty(result))
                        return res.status(400).send({
                            error: true,
                            message: "no user available",
                        });

                    const filter = {
                        $and: [{ todoId: todoId }, { userId: result.userId }],
                    };

                    Todo.findOneAndUpdate(filter, { $set: update }, { new: true }).then(
                        (result) => {
                            if (validator.isEmpty(result))
                                return res.status(400).send({
                                    error: true,
                                    message: "Invalid todo Id",
                                });
                            return res.status(200).send({
                                error: false,
                                message: "Data updated successfully",
                                data: result,
                            });
                        }
                    );
                });
            } else
                return res.status(400).send({
                    error: true,
                    message: "Unauthorized",
                });
        } catch (error) {
            return res.status(500).send({
                error: true,
                message: error.message,
            });
        }
    },
    deleteTodo: (req, res) => {
        try {
            const { todoId } = req.body;
            const user = req.user.data;

            if (!validator.isEmpty(user)) {
                const userFilter = {
                    $or: [{ username: user }, { email: user }, { phoneNumber: user }],
                };

                Profile.findOne(userFilter).then((result) => {
                    if (validator.isEmpty(result))
                        return res.status(400).send({
                            error: true,
                            message: "no user available",
                        });

                    const filter = { todoId: todoId };

                    Todo.findOne(filter)
                        .then((existingTodo) => {
                            if (!existingTodo) {
                                return res.status(404).send({
                                    error: true,
                                    message: "Todo not found",
                                });
                            }

                            Todo.findOneAndDelete(filter)
                                .then((result) => {
                                    return res.status(200).send({
                                        error: false,
                                        message: "Todo has been deleted",
                                        data: result,
                                    });
                                })
                                .catch((error) => {
                                    return res.status(500).send({
                                        error: true,
                                        message: error.message,
                                    });
                                });
                        })
                        .catch((error) => {
                            return res.status(500).send({
                                error: true,
                                message: error.message,
                            });
                        });
                });
            } else
                return res.status(400).send({
                    error: true,
                    message: "Unauthorized",
                });
        } catch (error) {
            return res.status(500).send({
                error: true,
                message: error.message,
            });
        }
    },
    viewTodoById: (req, res) => {
        try {
            const { todoId } = req.params;
            const user = req.user.data;

            if (!validator.isEmpty(user)) {
                const userFilter = {
                    $or: [{ username: user }, { email: user }, { phoneNumber: user }],
                };

                Profile.findOne(userFilter).then((result) => {
                    if (validator.isEmpty(result))
                        return res.status(400).send({
                            error: true,
                            message: "no user available",
                        });

                    const filter = {
                        $and: [{ todoId: todoId }, { userId: result.userId }],
                    };

                    Todo.findOne(filter).then((result) => {
                        if (validator.isEmpty(result))
                            return res.status(400).send({
                                error: true,
                                message: "Invalid todo Id",
                            });
                        return res.status(200).send({
                            error: false,
                            message: "success",
                            data: result,
                        });
                    });
                });
            } else
                return res.status(400).send({
                    error: true,
                    message: "Unauthorized",
                });
        } catch (error) {
            return res.status(500).send({
                error: true,
                message: error.message,
            });
        }
    },
    viewTodo: (req, res) => {
        try {
            const fromDate = parseFloat(req.query.fromDate);
            const toDate = parseFloat(req.query.toDate);
            const sort = req.query.sort;
            const user = req.user.data;

            if (!validator.isEmpty(user)) {
                const userFilter = {
                    $or: [{ username: user }, { email: user }, { phoneNumber: user }],
                };

                Profile.findOne(userFilter).then((result) => {
                    if (validator.isEmpty(result))
                        return res.status(400).send({
                            error: true,
                            message: "No user available",
                        });

                    const userId = result.userId;
                    const filter = [];

                    if (!validator.isEmpty(fromDate) && !validator.isEmpty(toDate)) {
                        const dateMatch = {
                            $match: {
                                userId: userId,
                                createdAt: { $gte: fromDate, $lte: toDate },
                            },
                        };
                        filter.push(dateMatch);

                        if (sort === "1") {
                            const ascendingSort = {
                                $sort: {
                                    createdAt: 1,
                                },
                            };
                            filter.push(ascendingSort);
                        } else {
                            const descendingSort = {
                                $sort: {
                                    createdAt: -1,
                                },
                            };
                            filter.push(descendingSort);
                        }
                    } else {
                        const dateMatch = {
                            $match: {
                                userId: userId,
                            },
                        };

                        filter.push(dateMatch);
                    }

                    Todo.aggregate(filter).then((result) => {
                        if (validator.isEmpty(result)) {
                            return res.status(400).send({
                                error: true,
                                message: "No available todo",
                            });
                        }

                        return res.status(200).send({
                            error: false,
                            message: "Success",
                            data: result,
                        });
                    });
                });
            } else {
                return res.status(400).send({
                    error: true,
                    message: "Unauthorized",
                });
            }
        } catch (error) {
            return res.status(500).send({
                error: true,
                message: error.message,
            });
        }
    },
};
