const express = require('express')
const router = express.Router()

const db = require('../db/connection')

router.get('/', (request, response) => {
    db.getTasks()
    .then(task => {
        response.json(task)
    })
})

module.exports = router