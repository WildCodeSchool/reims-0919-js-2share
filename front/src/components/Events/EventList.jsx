import React from 'react';
import './Event.css'


function EventList (props){
  return(
    props.events.map(event => (
      <article className='event_list_style' key={event.id}>
        <p>Début :{event.date_start.substring(10,16)}<br/>Fin :{event.date_end.substring(10,16)}</p>
        <h4 className='title_newEvent'>{event.title}</h4>
        <button className='test2' onClick={()=> props.removeEvent(event.id)}>
          <i className="fas fa-calendar-minus" aria-hidden="true">Supp</i>
        </button>
      </article>
      )
    )
  )
}

export default EventList;
