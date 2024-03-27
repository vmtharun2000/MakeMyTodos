const express = require("express");
const app = express();
const logger = require("morgan");
const dbConfig = require("./config/ConfigDB");
const profile = require("./routes/Profile");
const todo = require("./routes/Todo");
const multer = require('multer'); 
const upload = multer();

dbConfig.connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.array()); 
app.use(logger("dev"));

app.use("/profile", profile);
app.use("/todo", todo);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
