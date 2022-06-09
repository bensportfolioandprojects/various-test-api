const express = require('express');
const morgan = require('morgan');
const toDoRouter = require('./route/todo-router.js');
const port = process.env.port || 3000;
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use('/toDo', toDoRouter);

app.use(function (error, request, response,next) {
    response.status(error.statusCode || 500)
    .send(error.message || "Something went wrong...")
});

app.listen(port, () => console.log('Up and running'));
