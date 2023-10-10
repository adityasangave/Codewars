const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = mongoose.Schema({
    name :{
        type : String,
        required : true,
        maxLength : 20
    },
    email:{
        type : String,
    },
    password:{
        type:String
    },
    challenges_participated : [{
        type : Schema.Types.ObjectId,
        ref : 'challenge'
    }]
})

module.exports = mongoose.model("user", User)