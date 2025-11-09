const mongoose = require('mongoose')

//Schema
var TutionSchema = mongoose.Schema({
    name: String,
    class: String,
    age: Number,
    contact: Number
})

//Model
var TutionModel = mongoose.model('Tution', TutionSchema)

module.exports = TutionModel