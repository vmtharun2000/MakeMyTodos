const mongoose = require("mongoose");

const ToDoListScheme = new mongoose.Schema({
    todoId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
        index: true,
    },
    createdAt: {
        type: Number,
        default: Date.now,
    },
    deadLine: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending, completed"],
        default: "pending",
    },
    data: {
        type: String,
        required: true,
    },
});

ToDoListScheme.set("validateBeforeSave", false);
ToDoListScheme.index({ userId: 1, createdAt: -1 });

module.exports = new mongoose.model("TodoList", ToDoListScheme);
