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
      familyList: []
    };
  }

  componentDidMount() {
    this.showFamily();
  }

  showFamily = () => {
    axios
      .get("http://localhost:8000/families")
      .then(response => this.setState({ familyList: response.data }));
  };

  render() {
    const { familyList } = this.state;
    return (
      <div>
        {familyList.map(family => (
          <ButtonRedirectory />
        ))}
      </div>
    );
  }
}

export default connect(mapStateToProps)(FamilyDirectory);
