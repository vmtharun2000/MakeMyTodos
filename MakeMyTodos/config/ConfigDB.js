const mongoose = require("mongoose");
const db = mongoose.connection;

db.on("connect", () => {
    console.log("MongoDB connected");
});

db.on("error", (error) => {
    console.log("MongoDB connection Error", error);
});

db.on("disconnected", () => {
    console.log("MongoDB connection disconnected");
});

process.on("SIGINT", () => {
    db.close().then(() => {
        console.log("MongoDB connection closed due to application termination");
        process.exit(0);
    });
});

module.exports.connectDb = () => {
    mongoose
        .connect("mongodb://localhost:27017/NotesAndTodoList")
        .then(() => {
            console.log("Successfully connected with MongoDB...");
        })
        .catch((err) => {
            console.error(err);
        });
};
