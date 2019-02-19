import React, { Component } from 'react';
import {getActivities} from '../actions/activityActions';
import {connect} from 'react-redux';
import Slider from 'react-slick';
import Comments from "./Comments";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

class Activities extends Component {
    constructor() {
      super();
      this.state = {
        Activities: []
      };
    }


componentDidMount() {
    console.log(this.props)
    const itineraryLink = this.props.id
          this.props.getActivities(itineraryLink);
          
        }
        

render() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
    };
    return (
    <div><h4>Activities</h4>
    <Slider className="activitySlider" {...settings}>
    {this.props.Activities.activities.map(activity => {
        return(
        <div key={activity._id}>
            <img className="activityPic" src={activity.activityPic} alt="activityPic"/>
            <span>{activity.activity}</span>
        </div>
            )}
    )}
    </Slider> 
    <Comments itineraryLink = {this.props.id}/>
    </div>
    )}
}


const mapStateToProps = (state) => ({
    Activities: state.reducerThree
  });

export default connect(mapStateToProps, {getActivities})(Activities);