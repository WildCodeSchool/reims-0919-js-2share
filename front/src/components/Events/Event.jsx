import React from 'react';
import Calendar from 'react-calendar';
import './Event.css'
import axios from 'axios';

class Event extends React.Component {
  constructor() {
    super()
    this.state = { 
      date: new Date(),
      events : []
    }
  }

// Api call (eventlist)

  getEvent = () =>{
    console.log('sergiorico')
    axios.get('http://localhost:8000/events')
      .then (response => {
        console.log(response.data)
        this.setState({
          events : response.data
        })
      })
  }

  componentDidMount(){
    console.log('lol')
    this.getEvent();
  }

      
  onChange = date => {
    this.setState({date})
    console.log(date)
  }
      
  render() {
    return (
      <div>
        <h2 className='event_title'>Calendrier Partagé</h2>
        <div className='main_calendar' onClick={this.reset}>
          <Calendar
            onChange={this.onChange}
            value={this.state.date}
            selectRange={false}
          />
        </div>
        <h4 className='event_title'>Rappels :</h4>
        <div>

        </div>
      </div>
    );
  }    
}

export default Event;