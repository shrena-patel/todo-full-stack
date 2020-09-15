import request from 'superagent'

export function getAllTasks () {
    return request
    .get('/v1/tasks')
    .then(response => response.body)
}

export function apiAddTask (task) {
    return request
    .post('/v1/tasks')
    .send(task)
    .then(response => response.body.id)
}

export function apiDeleteTask (id) {
    return request
    .delete('/v1/tasks/' + id)
    .then(response => response.body)
}

export function apiUpdateTask (id, task) {
    return request
    .patch('/v1/tasks/' + id)
    .send(task)
    .then(response => response.body)
}