const express = require('express')
const router = express.Router()

const db = require('../db/connection')

router.get('/', (request, response) => {
    db.getTasks()
    .then(task => {
        response.json(task)
    })
})

router.post('/', (request, response) => {
    db.addTask(request.body)
    .then(ids => {
        response.json({id: ids[0]})
    })
})

router.delete('/:id', (request, response) => {
    db.deleteTask(request.params.id)
    .then(tasksDeleted => {
        response.json(tasksDeleted)
    })
})

module.exports = router