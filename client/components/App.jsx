import React from 'react'
import TodoList from './TodoList'


class App extends React.Component {
  

  render() {
    return (
      <>
        <header className="header">
          <h1>Todo List</h1>
          <TodoList/>
        </header>
        <section className="main"></section>
        <footer className="footer"></footer>
      </>
    )
  }
}

export default App
