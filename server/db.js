const mongoose = require('mongoose')
const env = require("dotenv")
env.config()

const connectDB = () => {
    mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((result) => {
            console.log("\x1b[42m%s\x1b[0m", "Database is connected")
        }).catch((error) => {
            console.log(error)
        })
}

module.exports = connectDB