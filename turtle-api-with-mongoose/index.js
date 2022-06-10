const express = require('express');
const morgan = require('morgan');
const turtleRouter = require('./route/turtle-router');
const port = process.env.port || 3000; 
const app = express();
const mongoose = require('mongoose');
const { response } = require('express');
const DATABASE = 'test';
const DB_URI = `mongodb://localhost:27017/${DATABASE}`;

app.use(morgan('dev'));
app.use(express.json());
app.use('/turtle', turtleRouter);

function main () {
    mongoose.connect(DB_UR, {}, function (err) {
        if (err) {
            throw err;
        } else {
            console.log('connected to database');

            app.use(function (error, request, reasponse, next) {
                response.status(error.statusCode || 500)
                .send(error.message|| "Something went wrong...");
            });

            app.listen(port, () => console.log('Up and running'));
        }
    }
    )};

main();

