const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProblemStatement = new mongoose.Schema({
    name : {
        type : String,
        maxLength : 40,
    },
    difficulty : {
        type : String,
    },  
    time_to_solve : {     //Time given to candidates to solve challenge if chosen
        type : Number,
    },
    description : {
        type : String
    },
    example_input : {
        type : String,
    },
    example_output : {
        type : String,
    },
    required_testcase_input : { // Since every testcase ip/op is string this helps identify to which dtype testcase ip/op should be converted
        type : String
    },
    required_testcase_output : {
        type : String
    },
    testcases : [{
        input : String,
        output : String
    }]
},
{
    timestamps:true
})

const Problem = new mongoose.model('ps', ProblemStatement)
module.exports = Problem;