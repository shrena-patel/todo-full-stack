import React from 'react'
import AddTodo from './AddTodo'
import { connect } from 'react-redux'
import { initTask, deleteTask } from '../actions/tasks'

import { getAllTasks, apiDeleteTask } from '../apis/tasks'

class TodoList extends React.Component {

    componentDidMount() {
        getAllTasks()
            .then(task => (this.props.dispatch(initTask(task))))
    }

    render() {
        return (
            <>
                <AddTodo />

                <section className="main">
                    <input id="toggle-all" className="toggle-all" type="checkbox" />
                    <label htmlFor="toggle-all">Mark all as complete</label>
                    <ul className="todo-list">

                        {this.props.tasks.map(task => {

                            return (
                                <li key={task.id}>
                                    <div className="view">
                                        <input className="toggle" type="checkbox" />
                                        <label>{task.task}</label>
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
                    
                    { (this.props.tasks.length == 1) ? ' item' : ' items' } left
                    </span> 
                    {/* ABOVE - 0 needs to be tasks.length */}
                    {/* <!-- Remove this if you don't implement routing --> */}
                    <ul className="filters">
                        <li>
                            <a className="selected" href="#/">All</a>
                        </li>
                        <li>
                            <a href="#/active">Active</a>
                        </li>
                        <li>
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