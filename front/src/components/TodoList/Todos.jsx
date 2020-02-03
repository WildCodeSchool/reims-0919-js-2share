import React, { Component } from "react";
import TodoList from "./TodoList";
import axios from "axios";
import cogoToast from "cogo-toast";
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  token: state.token
})

const h2 = text => (
  <h2
    className="flex-self:stretch space:inset space:stack title"
    style={{
      backgroundColor: "var(--primary-color)",
      background:
        "linear-gradient(var(--primary-color), 10%, var(--secondary-color))",
      color: "var(--primary-text-color)"
    }}
  >
    {text}
  </h2>
);

class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      description: ""
    };
    this.removeItem = this.removeItem.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:8000/todos", {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.props.token,
    }
  })
    .then(response => response.json())
    .then(data => this.setState({
        todos: data}))
    }


  addTodo(e) {
    e.preventDefault();
    if (this.state.description === "") {
      cogoToast.warn("Add a todo please");
    } else {
      const body = {
        description: this.state.description,
        user_id: 1,
        family_id: 1
      };
      axios.post(`http://localhost:8000/todos`, body,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.props.token
        }
      })
      .then(res => {
        this.setState(prevState => ({
          todos: [...prevState.todos, res.data],
          description: ""
        }));
      });
    }
  }

  updateValue(e) {
    this.setState({ description: e.target.value });
  }

  removeItem(id) {
    const todos = this.state.todos.filter(todo => {
      return todo.id !== id;
    });
    this.setState({ todos });
  }
  render() {
    return (
      <div>
        {h2("TACHES A REALISER")}
        <ul
          className="space:inset text:center"
          style={{ listStyleType: "none" }}
        >
          <label for="tâche" className="space:inline">
            Tâche
          </label>
          <input
            id="tâche"
            className="flex:1 space:inset-squish space:inline"
            type="text"
            placeholder="Nouvelle tâche"
            value={this.state.description}

            onChange={(e) => {this.updateValue(e)}}
            />
          <button 
          className="flex-self:center space:inset-squish space-size:s"
          style={{fontWeight:'bold', fontSize:'20px'}}
          type="submit" onClick = {this.addTodo}>

            +
          </button>
        </ul>
        <TodoList todos={this.state.todos} removeItem={this.removeItem} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Todos); 
