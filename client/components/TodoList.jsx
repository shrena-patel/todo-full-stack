import React from 'react'
import AddTodo from './AddTodo'

import { connect } from 'react-redux'
import { initTask, deleteTask, updateTask } from '../actions/tasks'
import { getAllTasks, apiDeleteTask, apiUpdateTask } from '../apis/tasks'


class TodoList extends React.Component {

    // SET INITIAL STATE ===================================================
    // if using numbers, set initial state to null. Below, the editTask property will take the id of task, which is a number
    // For the filter property, we're setting it to 'all' as the default, so that 'All' in the footer of the todo list has a box around it by default

    state = {
        editTask: null,
        filter: 'all'
    }

    // ON COMPONENT LOAD ====================================================
    // 1. call the getAllTasks API function 
    // 2. dispatch the initTask function to redux, taking 'task' as the function's parameter ('task' is the result of the getAllTasks API function)

    componentDidMount() {
        getAllTasks()
            .then(task => (this.props.dispatch(initTask(task))))
    }

    // PRESS ENTER TO UPDATE TASK ============================================
    // If the key that is pressed down is 'Enter',
    // 1. make a new variable called new task, that is set to equal an object.
    // 2. this object sets the task property to take what is written in the update task input field.
    // 3. call the apiUpdateTask function, taking in a taskId and the newTask variable
    // 4. updatedTask is what is returned from the apiUpdateTask function 
    // 5. disptach the updateTask function to redux, taking the taskId and newTask as parameters.

    handleKeyPress = (taskId, event) => {
        if (event.key == 'Enter') {

            const newTask = { task: event.target.value }

            apiUpdateTask(taskId, newTask)
                .then(updatedTask => {
                    this.props.dispatch(updateTask(taskId, newTask))
                })
        }
    }

    // ON CLICK, CHANGE 'COMPLETED' PROPERTY ====================================
    // When you click on the green tick input button, change the 'completed' property of task to be true.
    // When you click again to get rid of the tick, chnage the 'completed' property of task to be false.
    // 1. define a completed variable that is equal to an object
    // 2. this object sets a completed property to whether or not the tick input is checked
    // 3. then set the actual 'completed' property of task to equal event.target.checked
    // 4. call the apiUpdateTask function, taking the task.id and completed as the parameters
    // 5. dispatch the updateTask function to redux, taking task.id and task as the parameters

    handleOnClick = (task, event) => {
        const completed = { completed: event.target.checked }
        task.completed = event.target.checked

        apiUpdateTask(task.id, completed)
            .then(updatedTask => {
                this.props.dispatch(updateTask(task.id, task))
            })
    }

    // ON CLICK, SET STATE FOR FILTERING ACTIVE/COMPLETED TASKS =============================
    // handleFilterClick takes event and filter as parameters
    // 1. set state to have a filter property, that takes the filter passed into handleFilterClick as the value of the property
    // 2. this is then used in the filter function below.

    handleFilterClick = (event, filter) => {
        event.preventDefault()
        this.setState({
            filter: filter
        })
    }

    render() {
        return (
            <>
                <AddTodo />

                <section className="main">
                    <input id="toggle-all" className="toggle-all" type="checkbox" />

                    {/* ABOVE input is the down arrow next to 'What needs to be done?' */}

                    <label htmlFor="toggle-all">Mark all as complete</label>

                    <ul className="todo-list">

                        {/* FILTER FUNCTION ==================================
                        // This filter function is filtering over the tasks. 
                        // 1. If the filter property is set to active, return the completed property of task to be set to false
                        // 2. If the filter property is set to completed, return the completed property of task to be set to true
                        // 3. Otherwise, return the default value which is 'all'.
                        // 4. this.state.filter refers to the state property of 'filter' */}

                        {this.props.tasks.filter(task => {
                            switch (this.state.filter) {
                                case 'active':
                                    return task.completed == false
                                case 'completed':
                                    return task.completed != false
                                default:
                                    return true
                            }
                        })

                            .map(task => {
                                return (

                                    // LIST ITEM CLASSNAME ================================================
                                    // list item is each task returned from the map
                                    // if task.completed is set to true, set the class name to completed, otherwise don't set a class name.
                                    // this enables the the strike through functionality - i.e. when the task is marked as completed, the className is applied 
                                    // (in CSS, the 'completed' class is set to text-decoration: line-through)

                                    <li key={task.id} className={task.completed ? "completed" : ""} >

                                        <div className="view">

                                            {/* BELOW INPUT ===============================================
                                        // The input is the green tick box.
                                        // Onchange - when state is changed - call the handleOnClick function 
                                        // the handleOnClick funciton takes two parameters: task and event.
                                        // */}
                                            <input className="toggle" type="checkbox" onChange={(event) => this.handleOnClick(task, event)} defaultChecked={task.completed} />

                                            {/* ON DOUBLE CLICK ============================================
                                        // set state so that editTask property is the id of task
                                         */}
                                            <label onDoubleClick={() => {
                                                this.setState({
                                                    editTask: task.id
                                                })
                                            }}>
                                                {/* BELOW - if this.state.editTask equals the id of task, display an input field that can be used to update the current task. Else, display the current task */}
                                                {(this.state.editTask == task.id) ? <input type="text" defaultValue={task.task} onKeyDown={(event) => this.handleKeyPress(task.id, event)} /> : task.task}
                                            </label>

                                            {/* BELOW - the destroy button is the red cross icon
                                        // when the icon is clicked on, the apiDeleteTask function is called, taking in the task.id parameter so it knows which task to delete
                                        // then, the deleteTask action is dispatched to redux */}
                                            <button className="destroy" onClick={() => {
                                                apiDeleteTask(task.id)
                                                    .then(() => {
                                                        this.props.dispatch(deleteTask(task))
                                                    })
                                            }}></button>

                                        </div>
                                        <input className="edit" value="Rule the web" />
                                    </li>
                                )
                            })}

                    </ul>
                </section>

                {/* FOOTER =============================================================================
                Move this to a new Footer Component */}

                <footer className="footer">
                    <span className="todo-count"><strong>{this.props.tasks.length}</strong>
                        {(this.props.tasks.length == 1) ? ' item' : ' items'} left
                        {/* ABOVE- if tasks.length = 1, print: '1 item left', else print: 'X items left' */}
                    </span>



                    <ul className="filters">

                        <li>
                            <a className={this.state.filter == 'all' ? "selected" : ""} href="#/" onClick={event => this.handleFilterClick(event, 'all')}>All</a>
                        </li>

                        <li>
                            <a className={this.state.filter == 'active' ? "selected" : ""} href="#/active" onClick={event => this.handleFilterClick(event, 'active')}>Active</a>
                        </li>

                        <li>
                            <a className={this.state.filter == 'completed' ? "selected" : ""} href="#/completed" onClick={event => this.handleFilterClick(event, 'completed')}>Completed</a>
                        </li>

                    </ul>

                    {/* <!-- Hidden if no completed items are left ↓ --> */}
                    <button className="clear-completed">Clear completed</button>
                </footer>
            </>
        )
    }
}

function mapStateToProps(globalState) {
    return { tasks: globalState.tasks }
}

export default connect(mapStateToProps)(TodoList)

















{/* Filter thorugh task - if 'active' set task.completed to false. if 'completed', set task.completed to true. Then do the map function afterwards. */ }


// console.log('hi')
// this.props.tasks && <EditTodo />
// on double click, stop showing task, and start showing input field

// conditional statement in task.task - 
// if state.editTask is false, 
// then show task.task, else show input field


// need an apiUpdateTask function in apis/tasks
// <input className="new-todo"  type="text" placeholder="Update task?" autoFocus={true} />