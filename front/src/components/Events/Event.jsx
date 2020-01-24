import React from 'react';
import EventList from './EventList'
import Calendar from 'react-calendar';
import './Event.css'
import axios from 'axios';
import Modal from 'react-modal';
// import { PostButton } from '../post-button-and-function/PostButton.component';

// eslint-disable-next-line
Date.prototype.getWeek = function() {
  var onejan = new Date(this.getFullYear(), 0, 1);
  var millisecsInDay = 86400000;
  return Math.ceil(
    ((this - onejan) / millisecsInDay + onejan.getDay() + 1) / 7
  );
};

const h2 = (text) => (
  <h2 className="flex-self:stretch space:inset space:stack title" style={{backgroundColor: 'var(--primary-color)', background: 'linear-gradient(var(--primary-color), 10%, var(--secondary-color))', color: 'var(--primary-text-color)'}}>{text}</h2>
)
const h4 = (text) => (
  <h4 className="flex-self:stretch space:inset space:stack title" style={{backgroundColor: 'var(--primary-color)', background: 'linear-gradient(var(--primary-color), 10%, var(--secondary-color))', color: 'var(--primary-text-color)'}}>{text}</h4>
)


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
      title:'',
      parent1:[],
      parent2:[]
    }
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.checkEvent = this.checkEvent.bind(this);
    this.changePeriod=this.changePeriod.bind(this);
    this.changePeriod2=this.changePeriod2.bind(this)
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

  // add event method
  addEvent = (event) => {
    event.preventDefault()
    axios.post("http://localhost:8000/events", {
        title: this.state.title,
        date_start: this.state.startDateEvent + ' ' + this.state.startHourEvent + ':00',
        date_end: this.state.endDateEvent + ' ' + this.state.endHourEvent + ':00',
        family_id: 1
      })
      .then(res => {
        this.setState({events : [...this.state.events, res.data] }, () => alert("Vos dates ont bien été enregistrées"));
      });
  };


  
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

  definePeriod = ({ date, view }) => {
    if (this.state.parent1.includes(date.getWeek() )){
      return "parent1"
    }
    if (this.state.parent2.includes(date.getWeek() )){
      return "parent2"
    }
    else{
      return "undefined_period"
    }
  }

  changePeriod () {
    this.setState({
      parent1:[1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51],
      parent2:[2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52]
    })
  }
  changePeriod2 () {
    this.setState({
      parent1:[3,4,7,8,11,12,15,16,19,20,23,24,27,28,31,32,35,36,39,40,43,44,47,48,51,52],
      parent2:[1,2,5,6,9,10,13,14,17,18,21,22,25,26,29,30,33,34,37,38,41,42,45,46,49,50]
    })
  }
   
  render() {
    return (
      <div>
        {h2('AGENDA')}
        <div className='main_calendar'>
          <Calendar
            onChange={this.onChange}
            value={this.state.date}
            selectRange={false} 
            locale={'fr-FR'}
            calendarType={"ISO 8601"}
            tileClassName={this.definePeriod}
          />
        </div>
        <div className='button_change_period'>
          <button onClick={this.changePeriod} >Garde 1/1</button>
          <button onClick={this.changePeriod2} >Garde 2/2</button>
          <button className='btn_newEvent' onClick={this.handleOpenModal}>+</button>
        </div>
        {h4('RAPPEL(S):')}
        <div className='event_list_container'>
         <EventList className='event_list' events={this.getEventsOfDate()} removeEvent={this.removeEvent} />
        </div>
        <div>
          <Modal 
            className='modal_style'
            isOpen={this.state.showModal}
          >
            {h4('NOUVEL EVENEMENT')}
            <form className="flex:column flex-both:center" action="#">
            <div classname="flex:column flex-cross:center space:stack">
              <label className="space:stack" htmlFor="titre">Titre :</label>
              <input className="flex:1 space:inset-squish" type='text' name="title" value={this.state.title} onChange={this.handleInputChange} />
            </div>
            <div className="flex:column flex-cross:center space:stack" >
              <label className="space:stack" htmlFor="start-date">Start date :</label>
              <input className="flex:1 space:inset-squish" type='date' name="startDateEvent" value={this.state.startDateEvent} onChange={this.handleInputChange}/>

              <label className="space:stack" htmlFor="start-hour">Start hour :</label>
              <input className="flex:1 space:inset-squish" type='time' name="startHourEvent" value={this.state.startHourEvent} onChange={this.handleInputChange} />
            </div>
            <div className="flex:column flex-cross:center space:stack" >
              <label className="space:stack" htmlFor="end-date">End date :</label>
              <input className="flex:1 space:inset-squish" type='date' name="endDateEvent" value={this.state.endDateEvent} onChange={this.handleInputChange}/>
              
              <label className="space:stack" htmlFor="end-hour">End hour :</label>
              <input className="flex:1 space:inset-squish" type='time' name="endHourEvent" value={this.state.endHourEvent} onChange={this.handleInputChange}/>
              </div>
              <div>
                <button onClick={this.addEvent}>Valider</button>
              </div>
              <button onClick={this.handleCloseModal}>Fermer</button>
            </form>
          </Modal>
        </div>
      </div>
    );
  }    
}

export default Event;