import React, {Component} from 'react';
import axios from 'axios';


class TodoList extends Component {
  deleteItem = (id) => {
    axios(`http://localhost:8000/todos/${id}`, {
      method:'delete',
      headers: {
        'Authorization': this.props.token
      }})
      .then(response => {
        if (response.status === 200) {
          this.props.removeItem(id)
        }
      })
  };

  render() {
    return(
      <ul className="space:inset" style={{listStyleType: 'none'}}
      
      className="flex:column flex-cross:center space:stack">{ React.Children.toArray(this.props.todos.map((todo) => {
          return <li className="space:inline">
            <span className="space:inline">
            { todo.description }
            </span>
            <button className="space:inset-squish" onClick={() => { this.deleteItem(todo.id)}} >-</button>
          </li>
        }))}
      </ul>

    );
  }
}

export default TodoList;