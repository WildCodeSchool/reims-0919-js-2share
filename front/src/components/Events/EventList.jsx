import React from 'react';


function EventList (props){
  return(
    React.Children.toArray(props.events.map(event => (
      <article>
        <h4>{event.date_start}</h4>
        <p>{event.title}</p>
      </article>
        )
      )
    )
  )
}

export default EventList;
