import React from 'react';
import EventList from './EventList'
import Calendar from 'react-calendar';
import './Event.css'
import axios from 'axios';
import Modal from 'react-modal';
import { PostButton } from '../post-button-and-function/PostButton.component';


class Event extends React.Component {
  constructor() {
    super()
    this.state = { 
      date: new Date(),
      events : [],
      showModal: false,
      test:''
    }
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  getEvent = () =>{
    axios.get('http://localhost:8000/events')
      .then (response => {
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
    console.log('GetEventsOfDate ' + this.state.date.toISOString().substring(0,10))
    return this.state.events.filter (event => 
      event.date_start.split(" ")[0] === this.state.date.toISOString().substring(0,10))
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }

  handleInputChange(event) {
    console.log('lol')
    this.setState({test: event.target.value});
    console.log(this.state.test)
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
        <div className='event_list'>
         <EventList events={this.getEventsOfDate()} />
        </div>
        <div>
          <button className='test_btn_newEvent' onClick={this.handleOpenModal}>New Event</button>
          <Modal 
            className='test_modal'
            isOpen={this.state.showModal}
          >
            <h3>Nouvel évènement</h3>
            <form>
              <label htmlFor="titre">Titre :</label>
              <input type='text' />

              <label htmlFor="start-date">Start date :</label>
              <input type='date' value={this.state.test} onChange={this.handleInputChange}/>

              <label htmlFor="start-hour">Start hour :</label>
              <input type='time' />

              <PostButton/>
              <button onClick={this.handleCloseModal}>Fermer</button>
            </form>
          </Modal>
        </div>
      </div>
    );
  }    
}

export default Event;