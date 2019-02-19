import React, { Component } from 'react';
import Toolbar from "./Toolbar/Toolbar";




class SignUp extends Component {
    render() {
      return (
        <div className="signupDetails">
        <Toolbar/>
            <h2>Welcome to our app.</h2>
            <p>Please register with your details below.</p>
        <form>
            <label>
                <input type="checkbox" name="vehicle" value="Bike"/> I have a bike
            </label>
            <label>
                <input type="submit" value="Submit"/>
            </label>
        </form>
        </div>
      );
    }
  }
  
  export default SignUp;