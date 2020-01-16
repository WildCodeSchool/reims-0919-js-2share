import React from 'react';


function EventList (props){
  return(
    props.events.map(event => (
      <article key={event.id}>
        <h4>{event.title}</h4>
        <p>Début : {event.date_start.substring(10,16)}</p>
        <p>Fin : {event.date_end.substring(10,16)}</p>
        <button onClick={()=> props.removeEvent(event.id)}>Del.</button>
      </article>
      )
    )
  )
}

export default EventList;
