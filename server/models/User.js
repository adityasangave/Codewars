const mongoose = require('mongoose')

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
    }
})

module.exports = mongoose.model("user", User)