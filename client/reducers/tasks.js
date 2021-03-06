import { ADD_TASK } from '../actions/tasks'
import { DEL_TASK } from '../actions/tasks'
import { INIT_TASK } from '../actions/tasks'
import { UPDATE_TASK } from '../actions/tasks'

const initialState = []

const reducer = (state = initialState, action) => {
    
    switch (action.type) {
        case INIT_TASK:
            return action.task 
        
        case ADD_TASK:
            return [...state, action.task]

        case UPDATE_TASK:
            return state.map((task) => {
                if (action.currentTaskId == task.id) {
                    return action.newTask
                } else {
                    return task
                }
            })

        case DEL_TASK:
            return state.filter((task) => task !== action.task)

        default:
            return state
        
    }
}

export default reducer