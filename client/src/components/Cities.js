import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {getCities} from '../actions/citiesActions';
import {connect} from 'react-redux'; 

class Cities extends Component {
    constructor() {
      super();
      this.state = {
        search: '',
        //cities:[]
      };
    }

  updateSearch(event) {
      this.setState({search: event.target.value});
    }

  componentDidMount() {
    // axios.get("/api/city").then(res => {
    // console.log(res);
    //   this.setState({ cities: res.data });
      this.props.getCities();
    }
  

  render() {
    console.log(this.props)
      const filteredCities = this.props.cities.cities.filter(
        (city) => {
          return city.name.toLowerCase().indexOf(this.state.search) !==-1;
        }
      );
      return (
      <div>
        <div>
            <h2>Cities</h2>
        </div>
        <div>
            <input
                type="text"
                value={this.state.search}
                ref="search"
                onChange={this.updateSearch.bind(this)}
                placeholder="type city here"
            />
        </div>
      
        <div>
        {filteredCities.map(city => {
          return (
            <div  key={city._id}>
              <Link to={`/itinerary/${city._id}`}>
            <ul>
              <li>{city.name} {city.country}</li>
            </ul>
          </Link>
        </div>

            )
        })}
        </div>
      </div>
      );

    }
  }
  

  const mapStateToProps = (state) => ({
    cities: state.reducerOne
  });


Cities.propTypes = {
getCities: PropTypes.func.isRequired,
cities: PropTypes.object.isRequired
};


     


  // <div className="citiesInfo">
        // <h2>Barcelona</h2>
        //     <img src={barcelona} className="cityImg" alt="img"/>
        //     <h2>Sydney</h2>
        //     <img src={sydney} className="cityImg" alt="img"/>
        //     <h2>Vancouver</h2>
        //     <img src={vancouver} className="cityImg" alt="img"/>
        // </div>
  
  export default connect (mapStateToProps,{getCities})(Cities);