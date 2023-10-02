const express = require('express')
const environment = require('./config')
app = express()


app.listen(8000, ()=>{
    console.log("server started listening on port 8000" + environment())
})