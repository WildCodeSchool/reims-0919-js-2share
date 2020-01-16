import React from 'react';
import EventList from './EventList'
import Calendar from 'react-calendar';
import './Event.css'
import axios from 'axios';
import Modal from 'react-modal';
import { PostButton } from '../post-button-and-function/PostButton.component';
import Footer from '../Footer/Footer';



class Event extends React.Component {
  constructor() {
    super()
    this.state = { 
      date: new Date(),
      events : [],
      showModal: false,
      startDateEvent:'',
      endDateEvent:'',
      endHourEvent:'',
      startHourEvent:'',
      title:''
    }
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.checkEvent = this.checkEvent.bind(this);
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
    return this.state.events.filter (event => 
      event.date_start.split(" ")[0] === this.state.date.toISOString().substring(0,10))
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }

  handleInputChange(evt) {
    const value = evt.target.value;
    this.setState({
      ...this.state,
      [evt.target.name]: value
    });
  }
  
  checkEvent(id) {
    const events = this.state.events.filter((event) => {
      return event.id !== id
    })
    this.setState({ events })
  }

  removeEvent = (id) =>{
    axios.delete(`http://localhost:8000/events/${id}`)
      .then (response => {
          if (response.status === 200) {
            this.checkEvent(id)
          }
      })
  }
   
  render() {
    return (
      <div>
        <h2 className='event_title'>Calendrier Partagé</h2>
        <div className='main_calendar'>
          <Calendar
            onChange={this.onChange}
            value={this.state.date}
            selectRange={false}           // à voir 
            locale={'fr-FR'}
            calendarType={"ISO 8601"}
            showWeekNumber={true} //à voir 
          />
        </div>
        <h4 className='event_title'>Rappels :</h4>
        <div className='event_list'>
         <EventList events={this.getEventsOfDate()} removeEvent={this.removeEvent} />
        </div>
        <div>
          <button className='test_btn_newEvent' onClick={this.handleOpenModal}>New Event</button>
          <Modal 
            className='test_modal'
            isOpen={this.state.showModal}
          >
            <h3>Nouvel évènement</h3>
            <form action="#">
              <label htmlFor="titre">Titre :</label>
              <input type='text' name="title" value={this.state.title} onChange={this.handleInputChange} />

              <label htmlFor="start-date">Start date :</label>
              <input type='date' name="startDateEvent" value={this.state.startDateEvent} onChange={this.handleInputChange}/>

              <label htmlFor="start-hour">Start hour :</label>
              <input type='time' name="startHourEvent" value={this.state.startHourEvent} onChange={this.handleInputChange} />

              <label htmlFor="end-date">End date :</label>
              <input type='date' name="endDateEvent" value={this.state.endDateEvent} onChange={this.handleInputChange}/>
              
              <label htmlFor="end-hour">End hour :</label>
              <input type='time' name="endHourEvent" value={this.state.endHourEvent} onChange={this.handleInputChange}/>
              <PostButton 
              startDate={this.state.startDateEvent + ' ' + this.state.startHourEvent + ':00'} 
              endDate={this.state.endDateEvent + ' ' + this.state.endHourEvent + ':00'}
              title={this.state.title}
              />
              <button onClick={this.handleCloseModal}>Fermer</button>
            </form>
          </Modal>
          <Footer />
        </div>
      </div>
    );
  }    
}

export default Event;