const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProblemStatement = new mongoose.Schema({
    name : {
        type : String,
        maxLength : 40,
        required : true
    },
    difficulty : {
        type : String,
        required : true
    },  
    time_to_solve : {     //Time given to candidates to solve challenge if chosen
        type : Number,
        required:true
    },
    description : {
        type : String
    },
    example_input : {
        type : String,
        required : true
    },
    example_output : {
        type : String,
        required : true
    }
})