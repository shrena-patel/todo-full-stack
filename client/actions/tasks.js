export const ADD_TASK = 'ADD_TASK'
export const DEL_TASK = 'DEL_TASK'
export const INIT_TASK = 'INIT_TASK'

export function initTask (task) {
    return {
        type: INIT_TASK,
        task: task
    }
}

export function addTask (task) {
    return {
        type: ADD_TASK,
        task: task
    }
}

export function deleteTask (task) {
    return {
        type: DEL_TASK,
        task: task
    }
}