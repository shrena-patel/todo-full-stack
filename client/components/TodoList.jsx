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
            
            console.log(event.target.value)
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
        // console.log(event.target.checked)
        const completed = { completed: event.target.checked }
        task.completed = event.target.checked

        // console.log('this is filter state', this.state.filter)
        apiUpdateTask(task.id, completed)
            .then(updatedTask => {
                // console.log('well done')
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

                        {/* Filter thorugh task - if 'active' set task.completed to false. if 'completed', set task.completed to true. Then do the map function afterwards. */}
                        {/* this.state.filter refers to the state property of 'filter' */}
                       
                        {/* FILTER FUNCTION ==================================
                        This function */}
                        {this.props.tasks.filter(task => {
                            switch (this.state.filter) {
                                case 'active':
                                    return task.completed == false
                                case 'completed':
                                    return task.completed != false
                                default:
                                    return true
                            }
                        }).map(task => {

                            return (
                                <li key={task.id} className={task.completed ? "completed" : ""} >
                                    <div className="view">
                                        <input className="toggle" type="checkbox" onChange={(event) => this.handleOnClick(task, event)} defaultChecked={task.completed} />

                                        <label onDoubleClick={() => {

                                            this.setState({
                                                editTask: task.id
                                            })
                                        }}>
                                            {(this.state.editTask == task.id) ? <input type="text" defaultValue={task.task} onKeyDown={(event) => this.handleKeyPress(task.id, event)} /> : task.task}

                                        </label>

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

                <footer className="footer">
                    {/* <!-- This should be `0 items left` by default --> */}
                    <span className="todo-count"><strong>{this.props.tasks.length}</strong>

                        {(this.props.tasks.length == 1) ? ' item' : ' items'} left
                        {/* ABOVE- if tasks.length = 1, print item, else print items */}
                    </span>
                    {/* ABOVE - 0 needs to be tasks.length */}
                    {/* <!-- Remove this if you don't implement routing --> */}
                    <ul className="filters">
                        <li>
                            {/* React Router */}
                            <a className={this.state.filter == 'all' ? "selected" : ""} href="#/" onClick={event => this.handleFilterClick(event, 'all')}>All</a>
                        </li>
                        <li>
                            {/* React Router */}
                            <a className={this.state.filter == 'active' ? "selected" : ""} href="#/active" onClick={event => this.handleFilterClick(event, 'active')}>Active</a>
                        </li>
                        <li>
                            {/* React Router */}
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


// next: separate footer into new Footer component





// console.log('hi')
// this.props.tasks && <EditTodo />
// on double click, stop showing task, and start showing input field

// conditional statement in task.task - 
// if state.editTask is false, 
// then show task.task, else show input field


// need an apiUpdateTask function in apis/tasks
// <input className="new-todo"  type="text" placeholder="Update task?" autoFocus={true} />