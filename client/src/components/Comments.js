import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getComments, postComments} from '../actions/commentActions';
// import axios from 'axios';
// import PropTypes from 'prop-types';

class CommentForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        itinerary_id: '',
        username: '',
        comment: ''
    };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const itineraryLink = this.props.itineraryLink
              this.props.getComments(itineraryLink);
              
            }
  
    handleChange (event) {
      const acquireUsername = localStorage.getItem('username');
      this.setState({
        username: acquireUsername,
        comment: event.target.value,
        itinerary_id: this.props.itineraryLink});
     
    }
  
    user = React.createRef();
    comment = React.createRef();
    commentForm = React.createRef();
    
    handleSubmit(event) {
      event.preventDefault();
        this.props.postComments(this.state);
    }
  
    render() {
      console.log(this.props)
      return (
    <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input type="text" placeholder="Your comment..." ref={this.comments} value={this.state.value} onChange={this.handleChange} />
          </label>
          <button type="submit" value="Submit"> Add Comment</button>
          {/* <i class="material-icons">navigate_next</i> */}
        </form>
        <div>
        {this.props.comment.comments.map((comment) => (
            <div key={comment._id}>
              <p>{comment.username}:{comment.comment}</p>
           </div>
          )
        )};
        </div>
    </div>
      );
    }
  }

//   CommentForm.propTypes = {
//     getComments: PropTypes.func.isRequired,
//     comment: PropTypes.array.isRequired
//     };

  const mapStateToProps = (state) => ({
    comment: state.reducerFour
  });

  export default connect(mapStateToProps, {getComments, postComments})(CommentForm);