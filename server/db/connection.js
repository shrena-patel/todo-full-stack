const knex = require('knex')
const config = require('../../knexfile')
const env = process.env.NODE_ENV || 'development'
const connection = knex(config[env])

function getTasks (db = connection) {
    return db('tasks').select()
}

function addTask (db = connection) {
    return db('tasks')
    .insert(item)
}

function deleteTask (id, db = connection) {
    return db('tasks')
    .where('id', id)
    .del()
}



module.exports = {
    getTasks,
    addTask,
    deleteTask
}


// Build an API to list, add, update and delete