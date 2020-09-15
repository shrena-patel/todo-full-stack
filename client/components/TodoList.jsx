import React from 'react'
import AddTodo from './AddTodo'
import EditTodo from './EditTodo'
import { connect } from 'react-redux'
import { initTask, deleteTask, updateTask } from '../actions/tasks'

import { getAllTasks, apiDeleteTask, apiUpdateTask } from '../apis/tasks'



class TodoList extends React.Component {

    state = {
        editTask: null,   // if using numbers(id), set initial state to null
        filter: 'all' // this needs to be set to active or completed when clicked on. when checked = true - completed, when checked = false - active
    }


    componentDidMount() {
        getAllTasks()
            .then(task => (this.props.dispatch(initTask(task))))
    }

    handleKeyPress = (taskId, event) => {
        if (event.key == 'Enter') {
            // return apiUpdateTask(id, task)
            console.log(event.target.value)
            const newTask = { task: event.target.value }

            apiUpdateTask(taskId, newTask)
                .then(updatedTask => {
                    console.log(updatedTask)
                    this.props.dispatch(updateTask(taskId, newTask)) //need to change
                    //next: change what todos are being returned when you map over them - for clicking on completed tick box
                    //if task.completed is true, then show in the completed section

                })
        }
    }

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

    handleFilterClick = (event, filter) => {
        event.preventDefault()
        console.log(filter)
        this.setState({
            filter: filter
        })
        // ( task.completed == true )  ? this.state.filter == 'completed' : this.state.filter == 'active'
    }

    render() {
        return (
            <>
                <AddTodo />

                <section className="main">
                    <input id="toggle-all" className="toggle-all" type="checkbox" />
                    {/* onClick={(showtasks == true) ? showtasks : hidetasks} */}
                    {/* ABOVE input is the down arrow next to 'What needs to be done?' */}
                    <label htmlFor="toggle-all">Mark all as complete</label>
                    <ul className="todo-list">

                        {this.props.tasks.filter(task => {
                            switch(this.state.filter) {
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