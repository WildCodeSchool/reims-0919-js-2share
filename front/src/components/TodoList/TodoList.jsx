import React, { Component } from 'react';
import './TodoList.css';

export default class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: [], text: '' };
    this.removeItem = this.removeItem.bind(this)
  }

  addTodo(e) {
    e.preventDefault();
    this.setState({ todos: [ this.state.text, ...this.state.todos ], text: '' });
  }


  updateValue(e) {
    this.setState({ text: [e.target.value]})
  }
  removeItem(index) {
    const todos = this.state.todos.filter((todo, todoIndex) => {
      return todoIndex !== index
    })
    this.setState({ todos })
  }
  render() {
    return(
      <div>
        <h1> TODO LIST</h1>
        <form className="todolist" onSubmit = {(e) => this.addTodo(e)}>
          <input className="placeholder"
            type="text"
            placeholder="Add Todo"
            value={this.state.text}
            onChange={(e) => {this.updateValue(e)}}
            />
          <button className="btnAdd" type="submit">Add</button>
        </form>
        <TodoList todos={this.state.todos} removeItem={this.removeItem} />
      </div>
    );
  }
}

class TodoList extends Component {
  render() {
    return(
      <div className="list">{ this.props.todos.map((todo, index) => {
          return <div className="items">
                  { todo }
                  <button className="btnDelete" onClick={(e) => { this.props.removeItem(index)}} key={todo}>Del</button>
                </div>
        })}
        </div>

    );
  }
}