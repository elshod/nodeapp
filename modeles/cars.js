const {Schema, model} = require('mongoose')
const car = new Schema({
    model: String,
    color: String,
    distance: Number,
    year: Number
})
module.exports = model('Cars',car)