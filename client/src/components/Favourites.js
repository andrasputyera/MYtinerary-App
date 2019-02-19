import React, { Component } from "react";
import { connect } from "react-redux";
import { getFavItinerary } from "../actions/favouriteActions";

class FavouritesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getFavItinerary(this.props.user);
  }

  render() {
    console.log(this.props.user);
    return (
      <div>
        {this.props.itineraries.map(data => {
          return <div key={data._id}>{data._id}</div>;
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user,
  itineraries: state.itineraryReducer.itineraries
});

export default connect(mapStateToProps,{ getFavItinerary })(FavouritesPage);

