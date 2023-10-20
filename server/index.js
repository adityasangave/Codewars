const express = require('express')
const environment = require('./config')
const connect = require('./db')
const cors = require('cors')

const PORT = environment().PORT
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enables cookies and authentication headers
    optionsSuccessStatus: 204, // Send a 204 status for OPTIONS requests
};

connect()
app = express()
app.use(express.json())
app.use(cors(corsOptions))


app.get('/', (req, res) => {
    res.send("Done and dickli tick")
})

app.use('/auth', require('./routes/Auth/authController'))
app.use('/api', require('./routes/Core/challengeController'))
app.use('/api/problem', require('./routes/ProblemStatements/problemStatementController'))

const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: '*' } });

server.listen(PORT, () => {
    console.log("server started listening on port 8000")
})

require('./sockets/socketEvents')(io);