const express = require('express');
const Turtle = require('../model/Turtle');

const router = express.Router();


router.get('/getAll', async (request, response, next) => {
    response.contentType('application/json')
    .status(200)
    .json(await Turtle.find());
});

router.post('/create', (request, response, next) => {
    if (Object.keys(request.body).length == 0) return next({
        statusCode: 400, message: 'body cant be empty'
    });
    const turtle = new Turtle(request.body);
    await turtle.save();

});

router.put('/update', (request, response, next) => {
    if (Object.keys(request.body).length == 0) return next({
        statusCode: 400, message: 'body cant be empty'
    });
    const id = Number(request.body.id);
    if (isNaN(id)) next ({statusCode:400, message: 'ID must be a number' });
    const turtle = Turtle.find({ _id: id});
    
    if (turtle) {
        response.status(200).json(await Turtle.findById(request))
    } return next({
        statusCode: 404,
        message: `Turtle does not exist with id ${id}`
    });
    if (request.body.snappy) turtle.snappy = request.body.snappy;
    if (request.body.size) turtle.size = request.body.size;
    if (request.body.doesKungFu) turtle.doesKungFu = request.body.doesKungFu;

    await turtle.save();

    response.status(200).json(turtle);
});

router.delete('/delete/:id', (request, response, next) => {
    const id = request.params.id;

    const turtle = await Turtle.findByIdAndDelete(id);

    if (turtle) {
        response.status(200).json(turtle);
    } else {
        next({statusCode: 404, message: `Turtle does not exist with id ${id}`});
    }
    });

module.exports = router;
