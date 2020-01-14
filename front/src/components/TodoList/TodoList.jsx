import React, {Component} from 'react';
import './TodoList.css'
import Axios from 'axios';


class TodoList extends Component {
  deleteItem = (id) => {
    Axios(`http://localhost:8000/todos/${id}`, {method:'delete'})
      .then(response => {
        if (response.status === 200) {
          this.props.removeItem(id)
        }
      })
  };

  render() {
    return(
      <div className="list">{ React.Children.toArray(this.props.todos.map((todo) => {
          console.log(todo);
          return <div className="items">
            { todo.text }
            <button className="btnDelete" onClick={() => { this.deleteItem(todo.id)}} >Del</button>
          </div>
        }))}
        </div>

    );
  }
}

export default TodoList;