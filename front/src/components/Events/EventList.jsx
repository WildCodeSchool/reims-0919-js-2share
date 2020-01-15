import React from 'react';


function EventList (props){
  return(
    props.events.map(event => (
      <article key={event.id}>
        <h4>{event.title}</h4>
        <p>{event.date_start.substring(5,16)}</p>
        <p>{event.end_start}</p>
        <button onClick={()=> removeEvent()}>Del.</button>
      </article>
      )
    )
  )
}

export default EventList;
