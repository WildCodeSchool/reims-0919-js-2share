import React, { Component } from 'react';
import TodoList from './TodoList'
import './Todos.css';
import axios from 'axios';

export default class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      todos: [], 
      description: '' };
    this.removeItem = this.removeItem.bind(this)
  }

  componentDidMount(){
    axios.get('http://localhost:8000/todos')
    .then(response => 
      this.setState({
        todos: response.data
      }))    
  };
  

  addTodo(e) {
    e.preventDefault();
    if (this.state.description ===''){
      alert('Add a todo please')
    } else {
      const body = {
        description: this.state.description,
        user_id: 1,
        family_id: 1,
      };
      axios.post(`http://localhost:8000/todos`, body)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    }
  }

  updateValue(e) {
    this.setState({ description: e.target.value})
  }
  removeItem(id) {
    const todos = this.state.todos.filter((todo) => {
      return todo.id !== id
    })
    this.setState({ todos })
  }
  render() {
    return(
      <div>
        <h1 className="title"> TODO LIST</h1>
        <form className="todolist" onSubmit = {(e) => this.addTodo(e)}>
          <input className="placeholder"
            type="text"
            placeholder="Add Todo"
            value={this.state.description}
            onChange={(e) => {this.updateValue(e)}}
            />
          <button className="btnAdd" type="submit">Add</button>
        </form>
        <TodoList todos={this.state.todos} removeItem={this.removeItem} />
      </div>
    );
  }
}



