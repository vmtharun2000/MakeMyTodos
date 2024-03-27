const express = require("express");
const router = express.Router();

const todo = require("../controllers/Todo");
const auth = require("../middleware/Authentication");
const validator = require("../middleware/ValidateTodo");

router.post(
    "/createTodo",
    auth.authenticateToken,
    validator.validateCreateTodo,
    todo.createTodo
);

router.put(
    "/updateTodo",
    auth.authenticateToken,
    validator.validateUpdateTodo,
    todo.updateTodo
);

router.patch(
    "/updateTodoStatus",
    auth.authenticateToken,
    validator.validateUpdateTodoStatus,
    todo.updateTodoStatus
);

router
    .get("/viewTodoById/:todoId/", auth.authenticateToken, todo.viewTodoById)
    .get(
        "/viewTodo/",
        auth.authenticateToken,
        validator.validateViewTodo,
        todo.viewTodo
    );

router.delete(
    "/deleteTodoById",
    auth.authenticateToken,
    validator.validateDeleteTodo,
    todo.deleteTodo
);

router
    .head("/viewTodoById/:todoId/", auth.authenticateToken, todo.viewTodoById)
    .head(
        "/viewTodo/",
        auth.authenticateToken,
        validator.validateViewTodo,
        todo.viewTodo
    );

module.exports = router;
