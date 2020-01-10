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
      startDate:'',
      endDate:'',
      startDateEvent:'',
      endDateEvent:'',
      endHourEvent:'',
      startHourEvent:''
    }
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.enterDate = this.enterDate.bind(this);
    //this.handleEndDateChange = this.handleEndDateChange.bind(this);
  }

  getEvent = () =>{
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

  handleStartDateChange(evt) {
    const value = evt.target.value;
    this.setState({
      ...this.state,
      [evt.target.name]: value
    });
  }

  enterDate (){
    this.setState({
      startDate : this.state.startDateEvent+ ' ' + this.state.startHourEvent + ':00'
    })
    console.log(this.state.startDate)
  }
  // handleEndDateChange(event) {
  //   this.setState({endDate: event.target.value});
  // }

      
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
              <input type='date' name="startDateEvent" value={this.state.startDateEvent} onChange={this.handleStartDateChange}/>

              <label htmlFor="start-hour">Start hour :</label>
              <input type='time' name="startHourEvent" value={this.state.startHourEvent} onChange={this.handleStartDateChange} />

              <label htmlFor="end-date">End date :</label>
              <input type='date' name="endDateEvent" value={this.state.endDateEvent} onChange={this.handleStartDateChange}/>

              <label htmlFor="end-hour">End hour :</label>
              <input type='time' name="endHourEvent" value={this.state.endHourEvent} onChange={this.handleStartDateChange}/>

              <PostButton startDate={this.state.startDate} endDate={this.state.endDate} />
             
              <button onClick={this.handleCloseModal}>Fermer</button>
            </form>
            <button onClick={this.enterDate}>Test</button>
          </Modal>
        </div>
      </div>
    );
  }    
}

export default Event;