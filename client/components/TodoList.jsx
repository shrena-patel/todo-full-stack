import React from 'react'
import AddTodo from './AddTodo'
import EditTodo from './EditTodo'
import { connect } from 'react-redux'
import { initTask, deleteTask } from '../actions/tasks'

import { getAllTasks, apiDeleteTask, apiUpdateTask } from '../apis/tasks'



class TodoList extends React.Component {
    state = {
        editTask: null   // if using numbers(id), set initial state to null
    }

    // handleChange = (event) => {
    //     this.setState({
    //         [event.target.name]: event.target.value
    //     })
    // }

    // handleSubmit = (event) => {
    //     event.preventDefault()

    //     this.setState({task: ''})

    //     const currentTask = this.props.task
    //     const newTask = this.state.name //or name

    //     apiUpdateTask() //change this
    // }


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
            })
        }
    }

    render() {
        return (
            <>
                <AddTodo />

                <section className="main">
                    <input id="toggle-all" className="toggle-all" type="checkbox" />
                    <label for="toggle-all">Mark all as complete</label>
                    <ul className="todo-list">

                        {this.props.tasks.map(task => {

                            return (
                                <li key={task.id}>
                                    <div className="view">
                                        <input className="toggle" type="checkbox" />
                                        <label onDoubleClick={() => {
                                            this.setState({
                                                editTask: task.id
                                            })
                                        }}>
                                            {(this.state.editTask == task.id) ? <input type="text" defaultValue={task.task} onKeyDown={(event) => this.handleKeyPress(task.id, event)}/> : task.task}

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
                    </span>
                    {/* ABOVE - 0 needs to be tasks.length */}
                    {/* <!-- Remove this if you don't implement routing --> */}
                    <ul className="filters">
                        <li>
                            {/* React Router */}
                            <a className="selected" href="#/">All</a>
                        </li>
                        <li>
                            {/* React Router */}
                            <a href="#/active">Active</a>
                        </li>
                        <li>
                            {/* React Router */}
                            <a href="#/completed">Completed</a>
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








// console.log('hi')
// this.props.tasks && <EditTodo />
// on double click, stop showing task, and start showing input field

// conditional statement in task.task - 
// if state.editTask is false, 
// then show task.task, else show input field


// need an apiUpdateTask function in apis/tasks
// <input className="new-todo"  type="text" placeholder="Update task?" autoFocus={true} />