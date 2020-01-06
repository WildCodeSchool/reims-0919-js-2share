import React, {Component} from 'react';
import './TodoList.css'


class TodoList extends Component {
  render() {
    return(
      <div className="list">{ this.props.todos.map((todo, index) => {
          return <div className="items" key={index}>
                  { todo }
                  <button className="btnDelete" onClick={(e) => { this.props.removeItem(index)}} key={todo}>Del</button>
                </div>
        })}
        </div>

    );
  }
}

export default TodoList;