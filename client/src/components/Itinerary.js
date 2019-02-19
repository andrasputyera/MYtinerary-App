import React, { Component } from 'react';
import {getItineraries} from '../actions/itineraryActions';
import {addFavItinerary} from '../actions/favouriteActions';
import {connect} from 'react-redux';
import Activities from './Activities';
import {Modal, Button} from 'react-bootstrap';
import { Link } from "react-router-dom";


class Itineraries extends Component {
    constructor(props) {
      super(props);
      this.state = {
        Itineraries: [],
        showActivities: "",
        favButtonActive: false,
        favModalActive: false,
        favItinerary: "" 
      };

    this.handleToggle = this.handleToggle.bind(this);
    this.addToFav = this.addToFavourites.bind(this);
    this.handleClose = this.handleClose.bind(this);
    }

//When the component mounts, get itineraries from a selected city stored in mLab
componentDidMount() {
    const cityLink = this.props.match.params.id
          this.props.getItineraries(cityLink);
          
        }

//Activate "view" button to show activities of a selected itinerary        
handleToggle = (event) => {
    event.preventDefault();
    this.state.showActivities === event.target.id ? 
    this.setState({
        showActivities: ""
    
    }):this.setState({
        showActivities: event.target.id
    
    })

}   

//Add favourite while passing the itinerary_id and the username
addToFavourites(_id) {
    const getUsername = localStorage.getItem("username");
    this.setState(
      {
        show: true,
        favItinerary: _id,
        username: getUsername,
        favButtonActive: true
      },
      () =>
        this.props.addFavItinerary(
          this.state.favItinerary,
          this.state.username,
          this.state.favButtonActive
        )
    );
  }
handleClose() {
    this.setState({ show: false });
  }


render() {
    return (
    <div><h4>Available MYtineraries</h4>
    {this.props.Itineraries.itineraries.map(itinerary => {
        return(
        <div className="itineraryContainer" key={itinerary._id}>
            <img className = "profilePic" src={itinerary.profilePic} alt="userProfilePic"/>
            <div>{itinerary.title}</div>
            <div>{itinerary.rating} {itinerary.duration} {itinerary.cost}</div>
            <div>{itinerary.hashtags}</div>

            {/* ---------- ADD to Favourites Button + Modal ------------  */}
            <div>{this.state.favItinerary !== itinerary._id && (
                      <Button
                        variant="primary"
                        onClick={() => {
                          this.addToFav(itinerary._id);
                        }}
                      >
                        <i className="material-icons"> favorite_border </i>
                      </Button>
                    )}
                    {this.state.favItinerary === itinerary._id && (
                      <Button
                        variant="danger"
                        onClick={() => {
                          this.addToFav(itinerary._id);
                        }}
                        disabled
                      >
                        <i className="material-icons"> favorite </i>
                      </Button>
                    )}

                    <Modal show={this.state.show} onHide={this.handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>
                          MYtinerary added to your Favorites
                        </Modal.Title>
                      </Modal.Header>
                      <Link to={`/favourites/`}>
                        <Modal.Body>Go to Favorites page</Modal.Body>
                      </Link>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>



           {this.state.showActivities === itinerary._id 
            ? <Activities id={itinerary._id}/> 
            : null}

           {this.state.showActivities === itinerary._id 
            ? <button onClick={this.toggle} id={itinerary._id}>View Less</button> 
            : <button onClick={this.toggle} id={itinerary._id}>View All</button>}

        </div>
            )
        }
    )
}
</div>
    )
}
}


const mapStateToProps = (state) => ({
    Itineraries: state.reducerTwo,
    users: state.reducerFive,
    favButtonActive: state.reducerSix,
    favItinerary: state.reducerSix
  });

export default connect(mapStateToProps, {getItineraries, addFavItinerary})(Itineraries);