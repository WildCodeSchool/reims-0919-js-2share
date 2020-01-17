import React from "react";
import axios from "axios";
import ButtonRedirectory from "../family-button/ButtonRedirectory.component";

import { connect } from "react-redux";

const mapStateToProps = state => ({
  token: state.token
});

class FamilyDirectory extends React.Component {
  constructor(props) {
    super(props);

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
    axios
      .get("http://localhost:8000/families")
      .then(response => this.setState({ familyList: response.data }));
  };

  showEvents = () => {
    axios
      .get("http://localhost:8000/events")
      .then(response => this.setState({ eventsList: response.data }));
  };

  render() {
    const { familyList, eventsList } = this.state;
    return (
      <div>
        {familyList.map(family => (
          <ButtonRedirectory />
        ))}
        {eventsList.map(event => (
          <p key={event.id}>
            Date du rendez-vous :{event.date_start} <br /> Fin du rendez-vous
            prevue à : {event.date_end}
          </p>
        ))}
      </div>
    );
  }
}

export default connect(mapStateToProps)(FamilyDirectory);
