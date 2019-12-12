import React from 'react';
import Calendar from 'react-calendar';
import './Event.css'

class Event extends React.Component {
  constructor() {
    super()
    this.state = { 
      date: new Date(),
      showDate: false
    }
  }
      
  onChange = date => {
    this.setState({date})
  }

  validation = () => {
    this.setState ({
      showDate: true
    })
    console.log(this.state.date[0])
    console.log(this.state.date[1])
  }
      
  render() {
    return (
      <div>
        <h2 className='event_title'>Calendrier Partagé</h2>
        <div className='main_calendar' onClick={this.reset}>
          <Calendar className='test'
            onChange={this.onChange}
            value={this.state.date}
            selectRange={true}
          />
          <button onClick={this.validation}>Valider</button>
          { this.state.showDate ? (
            <div>
              <p>Du :{this.state.date[0].toLocaleDateString()}</p>
              <p>Au :{this.state.date[1].toLocaleDateString()}</p>
            </div>
          ) : null }
        </div>
        <div>
        <h4 className='event_title'>Rappels :</h4>
        </div>
      </div>
    );
  }    
}

export default Event;