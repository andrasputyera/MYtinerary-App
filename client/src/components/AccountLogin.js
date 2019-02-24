import React, { Component } from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom'
import Toolbar from './Toolbar/Toolbar';
import {loginUsers} from '../actions/loginActions';
import {postUsers} from '../actions/registerActions';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';


class AccountLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            emailError: "",
            passwordError: "",
            accessToken: ""
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.responseGoogle = this.responseGoogle.bind(this);
        this.responseFacebook = this.responseFacebook.bind(this);
    }


    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    validate = () => {
        let emailError = "";
        let passwordError = "";


    if (!this.state.email.includes('@')) {
    emailError = "this field is required"
    } 
    
    if (!this.state.password) {
    passwordError = "this field is required"
    }    
    

    if ( emailError || passwordError ) {
        this.setState({emailError, passwordError});
        return false
    }

    return true;
};


    onSubmit = event => {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
        this.props.loginUsers(this.state);
        }   
    };

//     handleGoogleLogin(event) {
//         event.preventDefault();
//         window.authenticateCallback = function(token) {
//             this.setState.accessToken = token;
//         };
//        // window.open("https://auth/googleLogin");
// }    

    

    async responseGoogle(res) {
        console.log(res)
    //    await this.props.oauthGoogle(res.accessToken);
        if(!res.error){

            let googleUser = {
                username: res.profileObj.name,
                email: res.profileObj.email,
                firstname: res.profileObj.givenName,
                lastname: res.profileObj.familyName,
                password: "",
                country: "",
                provider:"google"
            }
            this.props.postUsers(googleUser);
                if (!this.props.errorMessage) {
                   this.props.history.push("/profilepage");
                }
        }
    }

    async responseFacebook(res) {
        if(!res.error && res.status !="unknown"){
            let facebookUser = {
                username: res.name,
                email: res.email,
                firstname: res.name,
                lastname: res.name,
                password: "",
                country: "",
                provider:"facebook",
                id:res.id
            }

            this.props.postUsers(facebookUser);
            if (!this.props.errorMessage) {
               this.props.history.push("/profilepage");
            }
        }
        
    }
    
    render() {
        const enabled = 
        this.state.email.length > 0 &&
        this.state.password.length > 0;

        return (
            <div>
                <Toolbar/>
            <form onSubmit={this.onSubmit} className="account-container">
                <h5>Create Account</h5>
                <div className="form-group">
                    <label>Email</label>
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
                
                <div>
                <label>
                    <input
                    id="checkbox_id"
                    name="checked"
                    type="checkbox"
                    // checked={this.state.checked}
                    onChange={this.onChange}
                    />
                    <span>Remember Me</span>
                    {/* <div className="errorMessage">
                        {this.state.checkedError}
                    </div> */}
                </label>
                </div>
                <div className="form-group">
                    <button type="submit" disabled={!enabled} className="waves-effect waves-light btn">
                    OK
                    </button>
                </div>
            </form>
            <div>
            
            <GoogleLogin
               clientId="1053686737034-nvtl0dmcg7tr2e674oaprgf3pi92c6o4.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                className="g-signin2"
                />
            </div>
            <div>
            <FacebookLogin
                //appId="2934768580048916"
                appId="464813800562042"
                autoLoad={true}
                fields="name,email,picture"
                // onClick={componentClicked}
                callback={this.responseFacebook} 
                />
            </div>
                <p>Don't have a MYtinerary account?
                <NavLink to="/accountRegister"> Create Account</NavLink> here.</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.reducerFive.user,
    token: state.reducerFive.token,
    isAuthenticated: state.reducerFive.isAuthenticated

  });


export default connect(mapStateToProps, {loginUsers, postUsers} )(AccountLogin);