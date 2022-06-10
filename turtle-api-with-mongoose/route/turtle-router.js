const express = require('express');
const Turtle = require('../model/Turtle');

const router = express.Router();


router.get('/getAll', (request, response) => {
    response.contentType('application/json')
    .status(200)
    .json(await Turtle.find());
});

router.post('/create', (request, response, next) => {
    if (Object.keys(request.body).length == 0) return next({
        statusCode: 400, message: 'body cant be empty'
    });
    // const newTurtleData = request.body;
    // newTurtleData.id = idCounter++;
    // response.json(newTurtleData);
    const turtle = new Turtle(request.body);
    await turtle.save();

});

router.put('/update', (request, response, next) => {
    if (Object.keys(request.body).length == 0) return next({
        statusCode: 400, message: 'body cant be empty'
    });
    const id = Number(request.body.id);
    if (isNaN(id)) next ({statusCode:400, message: 'ID must be a number' });
    const turtle = database.find((turtle) => turtle.id ==id);
    
    if (!turtle) return next({
        statusCode: 404,
        message: `Turtle does not exist with id ${id}`
    });
    if (turtle.snappy) turtle.snappy = request.body.snappy;
    if (turtle.size) turtle.size = request.body.size;
    if (turtle.doesKungFu) turtle.doesKungFu = request.body.doesKungFu;

    response.status(200).json(turtle);
});

router.delete('/delete/:id', (request, response, next) => {
    const id = Number(request.params.id);

    if (isNaN(id)) next ({statusCode:400, message: 'ID must be a number' });
    const index = database.findIndex(function(turtle) {
        return turtle.id == id;
    });
    if (index == -1) return next( {
        statusCode: 404, message: `Turtle does not exist with id ${id}`
    });

    database.splice(index, 1);

    response.status(200)
    .send('Turtle deleted successfully.');
});

module.exports = router;

let idCounter = 1;
const database = [
    {
        id: 1,
        size: 'LARGE',
        colour: "brown",
        age: 121,
        snappy: false,
        species: "Loggerhead sea turtle",
        doesKungFu: false
    },
    {
        id: 2,
        size: "LARGE",
        colour: "brown",
        age: 81,
        snappy: false,
        species: "Kemp's ridley sea turtle",
        doesKungFu: false
    },
    {
        id: 3,
        size: "SMALL",
        colour: "brown",
        age: 7,
        snappy: false,
        species: "Snapping turtle",
        doesKungFu: true
    },
    {
        id: 4,
        size: "LARGE",
        colour: "blue",
        age: 41,
        snappy: false,
        species: "Hawksbill sea turtle",
        doesKungFu: false
    },
];