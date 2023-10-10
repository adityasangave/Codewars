const mongoose = require('mongoose')
const Schema = mongoose.Schema

function generateCode(){
    const characters = '0123456789'; // Only numbers
    let result = '';
    
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    
    return result;
}

const Challenge = new mongoose.Schema({
    challenge_name : {
        type : String,
        maxLength : 30,
        required : true
    },
    invite_code : {
        type: String,
        default : generateCode()
    },
    created_by : {
        type : Schema.Types.ObjectId,
        ref : 'user'
    },  
    problem_statement : {
        type : Schema.Types.ObjectId,
        ref : 'ps'
    },
    participants : [{
        type : Schema.Types.ObjectId,
        ref : 'user'
    }]
},
{
    timestamps:true
}
)

module.export = mongoose.model('challenge', Challenge)