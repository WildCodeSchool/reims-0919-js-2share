import React from 'react';
import './Event.css'


function EventList (props){
  return(
    props.events.map(event => (
      <article className="space:inset text:center" key={event.id}>
        <h4 className="space:inline">{event.title}</h4>
        <p className="flex:1 space:inset-squish space:inline">Début :{event.date_start.substring(10,16)}<br/>Fin :{event.date_end.substring(10,16)}</p>
        <button className="flex-self:center space:inset-squish"  onClick={()=> props.removeEvent(event.id)}>-</button>
      </article>
      )
    )
  )
}

export default EventList;
