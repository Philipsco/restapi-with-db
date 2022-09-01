const express = require('express');
const route = require('./routes/routes.js')

let app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api",route(express))

app.listen(3000, () => {
    console.log('Success running http://localhost:3000')
})

module.exports = app