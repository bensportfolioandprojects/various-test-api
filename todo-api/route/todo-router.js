const express = require('express');

const router = express.Router();


router.get('/getAll', (request, response) => {
    response.contentType('application/json')
    .status(200)
    .json(database);
});

router.get('/getById/:id', (request, response, next) => {
    response.contentType('application/json')
    .status(200)
    .json(database);
    if (index == -1) return next( {
        statusCode: 404, message: `Task does not exist with id ${id}`
    });
    
});

router.post('/create', (request, response, next) => {
    if (Object.keys(request.body).length == 0) return next({
        statusCode: 400, message: 'body cant be empty'
    });
    const newToDo = request.body;
    newToDo.id = idCounter++;
    response.json(newToDo);
});

router.put('/update', (request, response, next) => {
    if (Object.keys(request.body).length == 0) return next({
        statusCode: 400, message: 'body cant be empty'
    });
    const id = Number(request.body.id);
    if (isNaN(id)) next ({statusCode:400, message: 'ID must be a number' });
    const toDo = database.find((toDo) => toDo.id ==id);
    
    if (!toDo) return next({
        statusCode: 404,
        message: `Task does not exist with id ${id}`
    });
    
    if (toDo.task) toDo.task = request.body.task;
    if (toDo.byWhen) task.byWhen = request.body.byWhen;
    if (toDo.price) task.price = request.body.price;

    response.status(200).json(toDo);
});

router.delete('/delete/:id', (request, response, next) => {
    const id = Number(request.params.id);

    if (isNaN(id)) next ({statusCode:400, message: 'ID must be a number' });
    const index = database.findIndex(function(task) {
        return task.id == id;
    });
    if (index == -1) return next( {
        statusCode: 404, message: `Task does not exist with id ${id}`
    });

    database.splice(index, 1);

    response.status(200)
    .send('Task deleted successfully.');
});

module.exports = router;

let idCounter = 1;
const database = [
    {
        id: 1,
        task: 'feed the dog',
        byWhen: 10/06/2022,
        price: 0,
    },
    {
        id: 2,
        task: 'buy bananas',
        byWhen: 10/06/2022,
        price: 0.60,
    },
    {
        id: 3,
        task: 'pay rent',
        byWhen: 10/06/2022,
        price: 900,
    },
    {
        id: 4,
        task: 'go swimming',
        byWhen: 10/06/2022,
        price: 0,
    },
];