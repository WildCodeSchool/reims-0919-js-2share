import React from "react";

class FamilyDirectory extends React.Component {
  constructor() {
    super();

    this.state = {
      familyList: [],
      eventsList: []
    };
  }

  componentDidMount() {
    this.showFamily();
    this.showEvents();
  }

  showFamily = () => {
    fetch("http://localhost:8000/families")
      .then(response => response.json())
      .then(data => this.setState({ familyList: data }));
  };

  showEvents = () => {
    fetch("http://localhost:8000/events")
      .then(response => response.json())
      .then(data => this.setState({ eventsList: data }));
  };

  render() {
    const { familyList, eventsList } = this.state;
    return (
      <div>
        {familyList.map(family => (
          <h1 key={family.id}>Ma famille : {family.name}</h1>
        ))}
        {eventsList.map(event => (
          <p key={event.id}>
            Date du rendez-vous :{event.date_start} <br /> Fin du rendez-vous
            prevue a : {event.date_end}
          </p>
        ))}
      </div>
    );
  }
}

export default FamilyDirectory;
