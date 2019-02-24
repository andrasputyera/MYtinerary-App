import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfile } from "../actions/profileAction";

class ProfilePage extends Component {
  state = {};

  componentDidMount() {
    this.props.getProfile();
  }
  render() {
    return (
      <div>
        <h1> This is the profile page</h1>
        <div>{"email:" + this.props.profile.profile.email}</div>
        <div>{"name:" + this.props.profile.profile.username}</div>
      </div>
    );
  }
}

ProfilePage.propTypes = {
  getProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.reducerSeven
});

export default connect(
  mapStateToProps,
  { getProfile }
)(ProfilePage);