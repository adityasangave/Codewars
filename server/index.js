const express = require('express')
const environment = require('./config')
const connect = require('./db')

const PORT = environment().PORT

app = express()
connect()
app.use(express.json())

app.use('/auth', require('./routes/Auth/authController'))
app.use('/api', require('./routes/Core/challengeController'))

app.listen(PORT, ()=>{
    console.log("server started listening on port 8000")
})