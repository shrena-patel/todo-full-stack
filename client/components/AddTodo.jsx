import React from 'react'
import { connect } from 'react-redux'
import { addTask } from '../actions/tasks'
import { apiAddTask } from '../apis/tasks'


class AddTodo extends React.Component {

  state = {
      task: ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    this.setState({task: ''})

    const newTask = {task: this.state.task}

    apiAddTask(newTask)
        .then(id => {
          newTask.id = id
          this.props.dispatch(addTask(newTask))
        })
  }

    render() {
        return (
            <>
                <form className="form" onSubmit={this.handleSubmit}>
                    <input className="new-todo"  type="text" name="task" value={this.state.task} onChange={this.handleChange} placeholder="What needs to be done?" autoFocus={true} />
                </form>
            </>
        )

    }

}

export default connect()(AddTodo)
