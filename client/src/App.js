import React, { Component } from 'react';
import Footer from "../src/components/Footer";
import LandingPage from "./components/LandingPage3";
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Cities from './components/Cities';
import AccountLogin from './components/AccountLogin';
import Itinerary from './components/Itinerary';
import AccountRegister from './components/AccountRegister';
import ProfilePage from './components/ProfilePage';
import Favourites from './components/Favourites';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={LandingPage}/>
        <Route path='/cities' component={Cities} />
        <Route path='/itinerary/:id' component={Itinerary} />
        <Route path='/accountlogin' component={AccountLogin} />
        <Route path='/accountregister' component={AccountRegister} />
        <Route path='/profilepage' component={ProfilePage} />
        <Route path='/favourites' component={Favourites} />
        <Footer/>
      </div>
      </BrowserRouter>


    );
  }
}

export default App;
