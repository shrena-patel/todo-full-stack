import React from 'react'
import AddTodo from './AddTodo'
import { connect } from 'react-redux'
import { initTask, deleteTask } from '../actions/tasks'

import { getAllTasks, apiDeleteTask} from '../apis/tasks'

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

                        {/* <!-- These are here just to show the structure of the list items --> */}
                        {/* <!-- List items should get the className `editing` when editing and `completed` when marked as completed --> */}
                        {/* <li className="completed">
                        <div className="view">
                            <input className="toggle" type="checkbox" checked />
                            <label>Taste JavaScript</label>
                            <button className="destroy"></button>
                        </div>
                        <input className="edit" value="Create a TodoMVC template" />
                    </li>
                    <li>
                        <div className="view">
                            <input className="toggle" type="checkbox" />
                            <label>Buy a unicorn</label>
                            <button className="destroy"></button>
                        </div>
                        <input className="edit" value="Rule the web" />
                    </li> */}
                    </ul>
                </section>
            </>
        )
    }
}

function mapStateToProps(globalState) {
    return { tasks: globalState.tasks }
}

export default connect(mapStateToProps)(TodoList)