const express = require('express')
const environment = require('./config')
const connect = require('./db')

const PORT = environment().PORT

connect()
app = express()
app.use(express.json())

app.use('/auth', require('./routes/Auth/authController'))
app.use('/api', require('./routes/Core/challengeController'))
app.use('/api/problem', require('./routes/ProblemStatements/problemStatementController'))

const server = require('http').createServer(app);
const io = require('socket.io')(server, {cors : {origin : '*'}});

server.listen(PORT, () => {
    console.log("server started listening on port 8000")
})

require('./sockets/socketEvents')(io);