import React from 'react';
import './Event.css'


function EventList (props){
  return(
    props.events.map(event => (
      <article className='event_list_style' key={event.id}>
        <p>{event.date_start.substring(10,16)}</p>
        <h4>{event.title}</h4>
        <button className='test2' onClick={()=> props.removeEvent(event.id)}>
          <i className="fas fa-calendar-minus" aria-hidden="true" />
        </button>
      </article>
      )
    )
  )
}

export default EventList;
