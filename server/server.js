const express = require("express")
const taskRoutes = require('./routes/tasks')
const server = express()

server.use(express.json())
server.use(express.static("public"))
server.use('/v1/items', taskRoutes)

module.exports = server
