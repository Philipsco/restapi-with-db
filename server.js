require("dotenv").config()
const express = require('express');
const route = require('./routes/routes.js')

let app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api",route(express))

const port = process.env.PORT
app.listen(port, () => {
    console.log('Success running http://localhost:3000')
})

module.exports = app