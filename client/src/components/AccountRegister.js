import React, { Component } from 'react';
import {connect} from 'react-redux';
import Toolbar from './Toolbar/Toolbar';
import CountryList from '../data/CountryList';
import map from 'lodash/map';
import {postUsers} from '../actions/registerActions';

const initialState = {
            username: "",
            password: "",
            email: "",
            firstname: "",
            lastname: "",
            country: "",
            checked: false,
            usernameError: "",
            passwordError: "",
            emailError: "",
            firstnameError: "",
            lastnameError: "",
            countryError: "",
            checkedError: false,
}


class AccountRegister extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    // componentDidMount() {
    //     console.log(this.props)
    //          // this.props.postUsers();
              
    //         }

    onChange = event => {
        const isCheckbox = event.target.type === 'checkbox';
        this.setState({ [event.target.name]: isCheckbox 
            ? event.target.checked 
            : event.target.value
        });
    };

    validate = () => {
        let usernameError = "";
        let passwordError = "";
        let emailError = "";
        let firstnameError = "";
        let lastnameError = "";
        let countryError = "";
        let checkedError = false;

    if (!this.state.username) {
    usernameError = "this field is required"
    } 
    
    if (!this.state.password) {
    passwordError = "this field is required"
    }    

    if (!this.state.email.includes('@')) {
        emailError = "invalid email address";
    }

    if (!this.state.firstname) {
    firstnameError = "this field is required"
    } 
        
    if (!this.state.lastname) {
    lastnameError = "this field is required"
    }   

    if (!this.state.country) {
    countryError = "this field is required"
    }
    
    if (!this.state.checked) {
    checkedError = "this field should be checked"
    }  

    if (emailError || passwordError || usernameError || firstnameError || lastnameError || countryError || checkedError ) {
        this.setState({usernameError, passwordError, emailError, firstnameError, lastnameError, countryError, checkedError});
        return false
    }

    return true;
};


    onSubmit = event => {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
        // clearing the form after information has been entered
        this.setState(initialState);
        }
        this.props.postUsers(this.state);
    };
    
    render() {
        const options = map(CountryList, (val) =>
        <option key={val} value={val}>{val}</option>
        );
        const enabled = 
        this.state.username.length > 0 &&
        this.state.password.length > 0 &&
        this.state.email.length > 0 &&
        this.state.firstname.length > 0 &&
        this.state.lastname.length > 0 &&
        // this.state.country.value &&
        this.state.checked === true;

        return (
            <div>
                <Toolbar/>
            <form onSubmit={this.onSubmit} className="account-container">
                <h5>Create Account</h5>
                <div className="form-group">
                    <label>Username</label>
                    <input
                    value={this.state.username}
                    onChange={this.onChange}
                    type="text"
                    name="username"
                    className="form-control"
                    />
                    <div className="errorMessage">
                        {this.state.usernameError}
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label">Password</label>
                    <input
                    value={this.state.password}
                    onChange={this.onChange}
                    type="password"
                    name="password"
                    className="form-control"
                    />
                    <div className="errorMessage">
                        {this.state.passwordError}
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label">Email</label>
                    <input
                    value={this.state.email}
                    onChange={this.onChange}
                    type="text"
                    name="email"
                    className="form-control"
                    />
                    <div className="errorMessage">
                        {this.state.emailError}
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label">First Name</label>
                    <input
                    value={this.state.firstname}
                    onChange={this.onChange}
                    type="text"
                    name="firstname"
                    className="form-control"
                    />
                    <div className="errorMessage">
                        {this.state.firstnameError}
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label">Last Name</label>
                    <input
                    value={this.state.lastname}
                    onChange={this.onChange}
                    type="text"
                    name="lastname"
                    className="form-control"
                    />
                    <div className="errorMessage">
                        {this.state.lastnameError}
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label">Country</label>
                    <select
                    name="country"
                    className="browser-default"
                    value={this.state.country}
                    onChange={this.onChange}
                    >
                    <option value="" disabled>Choose</option>
                    {options}
                    </select>
                    <div className="errorMessage">
                        {this.state.countryError}
                    </div>
                </div >
                <div>
                <label>
                    <input
                    id="checkbox_id"
                    name="checked"
                    type="checkbox"
                    checked={this.state.checked}
                    onChange={this.onChange}
                    />
                    <span>I agree to MYtinerary's Terms &amp; Conditions</span>
                    <div className="errorMessage">
                        {this.state.checkedError}
                    </div>
                </label>
                </div>
                <div className="form-group">
                    <button type="submit" disabled={!enabled} className="waves-effect waves-light btn">
                    OK
                    </button>
                </div>

            </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.reducerFive
  });


export default connect(mapStateToProps, {postUsers})(AccountRegister);