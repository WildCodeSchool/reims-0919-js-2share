import React from 'react';
import Calendar from 'react-calendar';
import './Event.css'

class Event extends React.Component {
  constructor() {
    super()
    this.state = { 
      date: new Date(),
    }
  }
      
  onChange = date => this.setState({ date })
      
  render() {
    return (
      <div>
        <h2 className='event_title'>Calendrier Partagé</h2>
        <div className='main_calendar'>
          <Calendar className='test'
            onChange={this.onChange}
            value={this.state.date}
          />
        </div>
        <h4 className='event_title'>Rappels :</h4>
        <div className='btn_add_event'>
          <button onClick=''>Ajout RDV</button>
        </div>
      </div>
    );
  }    
}

export default Event;