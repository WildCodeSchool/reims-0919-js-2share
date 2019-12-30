import React from 'react';
import EventList from './EventList'
import Calendar from 'react-calendar';
import './Event.css'
import axios from 'axios';
import Modal from 'react-modal';

class Event extends React.Component {
  constructor() {
    super()
    this.state = { 
      date: new Date(),
      events : [],
      showModal: false,
    }
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

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
    this.getEvent();
  }
      
  onChange = date => {
    date.setHours(2)
    this.setState({date})
  }

  getEventsOfDate (){
    console.log('lol' + this.state.date.toISOString().substring(0,10))
    return this.state.events.filter (event => 
      event.date_start.split(" ")[0] === this.state.date.toISOString().substring(0,10))
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }
      
  render() {
    return (
      <div>
        <h2 className='event_title'>Calendrier Partagé</h2>
        <div className='main_calendar'>
          <Calendar
            onChange={this.onChange}
            value={this.state.date}
            selectRange={false}
            locale={'fr-FR'}
            calendarType={"ISO 8601"}
          />
        </div>
        <h4 className='event_title'>Rappels :</h4>
        <div>
         <EventList events={this.getEventsOfDate()} />
        </div>
        <button onClick={this.handleOpenModal}>New</button>
        <Modal 
           isOpen={this.state.showModal}
           contentLabel="Sergio Rico"
           onRequestClose={this.handleCloseModal}
        >
          <p>Nouvel évènement</p>
          <button onClick={this.handleCloseModal}>Close Modal</button>
        </Modal>
      </div>
    );
  }    
}

export default Event;