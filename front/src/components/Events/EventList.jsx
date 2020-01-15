import React from 'react';


function EventList (props){
  return(
    props.events.map(event => (
      <h4 key={event.id}>{event.title}</h4>
      )
    )
  )
}

export default EventList;
