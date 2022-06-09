// Turtle:
// Create one
// read all
// update one
// delete one

const express = require('express');
const morgan = require('morgan');
const turtleRouter = require('./route/turtle-router');
const port = process.env.port || 3000; // if process.env.port is not undefined or ull, itr will be assigned to port
// otherwise, port 3000 is assigned instead
const app = express();


// app.use() allows for middleware to be mounted to the application server
// - morgan() returns a middleware function when called
app.use(morgan('dev'));
app.use(express.json());
app.use('/turtle', turtleRouter);

// error handling middleware
// -first param is always the error
app.use(function (error, request, response,next) {
    response.status(error.statusCode || 500)
    .send(error.message || "Something went wrong...")
});

app.listen(port, () => console.log('Up and running'));

