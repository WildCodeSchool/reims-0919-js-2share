import React from 'react';

class FamilyDirectory extends React.Component {
    constructor() {
        super()

        this.state = {
            familyList : [],
            eventList : []
        }
    }

    componentDidMount() {
        this.showFamily()
        this.showEvents()
    }

    showFamily = () => {
        fetch('http://localhost:8000/families')
            .then(response => response.json())
            .then(data => this.setState({familyList : data}))
    }

    showEvents = () => {
        fetch('http://localhost:8000/events')
            .then(response => response.json())
            .then(data => this.setState({eventList : data}))
    }

    render() {
        const {familyList, eventList} = this.state
        return(
            <div>
                {familyList
                    .map(family => <h1>{family.name}</h1>)
                }               
            </div>
        )
    }
}

export default FamilyDirectory;