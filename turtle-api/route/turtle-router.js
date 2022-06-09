const express = require('express');

const router = express.Router();


router.get('/getAll', (request, response) => {
    response.contentType('application/json') //contentType is a shortcut provided by Express for creating the 'content-type': 'value' header
    .status(200)
    .json(database);
});

router.post('/create', (request, response, next) => {
    // data parsed into the request.body object can be accesed anywhere, we have access to the request object - we must use express.json() or body-parser() middleware
    if (Object.keys(request.body).length == 0) return next({
        statusCode: 400, message: 'body cant be empty'
    });
    const newTurtleData = request.body;
    // normally, we validate that the data on the request body is valid for the target resrouce we are creating - in this example, we aren't to simplify it
    newTurtleData.id = idCounter++;
    response.json(newTurtleData);
});

router.put('/update', (request, response, next) => {
    // make sure object updates is not empty
    if (Object.keys(request.body).length == 0) return next({
        statusCode: 400, message: 'body cant be empty'
    });
    // does the user exist?
    const id = Number(request.body.id);
    if (isNaN(id)) next ({statusCode:400, message: 'ID must be a number' });
    // does the turtle exist with the gieven id exist?
    const turtle = database.find((turtle) => turtle.id ==id);
    
    if (!turtle) return next({
        statusCode: 404,
        message: `Turtle does not exist with id ${id}`
    });
    
    // update existing turtle in db
    if (turtle.snappy) turtle.snappy = request.body.snappy;
    if (turtle.size) turtle.size = request.body.size;
    if (turtle.doesKungFu) turtle.doesKungFu = request.body.doesKungFu;

    response.status(200).json(turtle);
});

router.delete('/delete/:id', (request, response, next) => {
    // a colon followed by a name in a path is path parameter that can be accessed on the request.params object
    const id = Number(request.params.id);

    if (isNaN(id)) next ({statusCode:400, message: 'ID must be a number' });

    // find the index of the user in the array by their id
    // if the user doesnt exist:
    // throw an error response
    // stop
    // remove the user by their index from the array
    const index = database.findIndex(function(turtle) {
        return turtle.id == id;
    });
    // index is -1 if the turtle does not exist with the given id
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