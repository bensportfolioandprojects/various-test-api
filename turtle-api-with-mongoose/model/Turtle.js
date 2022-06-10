const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const turtleSchema = new Schema({
    size: String,
    colour: String,
    age: Number,
    snappy: Boolean,
    species: String,
    doesKungFu: Boolean,
    born: Date

});

const Turtle = mongoose.model('Turtle', turtleSchema);

module.exports = Turtle;

// {
//     id: 1,
//     size: 'LARGE',
//     colour: "brown",
//     age: 121,
//     snappy: false,
//     species: "Loggerhead sea turtle",
//     doesKungFu: false
//     born: new Date('1989-05-22')
// },