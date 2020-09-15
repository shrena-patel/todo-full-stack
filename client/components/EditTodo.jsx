import React from 'react'
import {connect} from 'react-redux'

import {updateTask} from '../actions/tasks'

class EditTodo extends React.Component {
    state = {
        ...this.props.tasks
    }


componentDidUpdate(prevProps) {
    if(prevProps.tasks.id !== this.props.tasks.id) {
        this.setState({
            ...this.props.tasks
        })
    }
}

handleChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value
    })
}

handleSubmit = (event) => {
    event.preventDefault()

    const id = this.props.tasks.id
    const newTask = this.state

    this.props.dispatch(updateTask(id, newTask))
}

render() {
    const tasks = this.props.tasks
    const name = tasks.name
    return (
        <>
            <h1>hello</h1>
        </>
    )
}

}



function mapStateToProps(state) {
    return {
        tasks: state.tasks
    }
}

export default connect(mapStateToProps)(EditTodo)