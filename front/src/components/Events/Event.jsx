import React from 'react';
import Calendar from 'react-calendar';
import './Event.css'
import Modal from 'react-modal';

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
          <Calendar
            onChange={this.onChange}
            value={this.state.date}
            selectRange={true}
          />
          <button className='btn_style' onClick={this.validation}>Valider</button>
        </div>
        <h4 className='event_title'>Rappels :</h4>
        <div>
        { this.state.showDate ? (
            <div className='text_style'>
              <p>Du : {this.state.date[0].toLocaleDateString()}</p>
              <p>Au : {this.state.date[1].toLocaleDateString()}</p>
            </div>
          ) : null }
        </div>
        <div className='btn_add_event'>
          <button onClick={this.handleOpenModal}>+</button>
          <Modal 
            isOpen={this.state.showModal}
            contentLabel="Sergio Rico"
            onRequestClose={this.handleCloseModal}
          >
            <h4>Nouvel évènement</h4>
            <p>Indiquer Date / Heure</p>
            <button onClick={this.handleCloseModal}>Close</button>
          </Modal>
        </div>
      </div>
    );
  }    
}

export default Event;