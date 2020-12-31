import React, { Component } from 'react';
import Signin from '../components/Signin/Signin';
import Scroll from '../components/Scroll/Scroll';
import NavBar from '../components/NavBar/NavBar';
import RepairList from '../components/Repairs/RepairList';
import Register from '../components/Register/Register';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faInbox, faTools, faReceipt, faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';
import './App.css';

library.add(faInbox, faTools, faReceipt, faCheck, faSpinner);

const initialState = {
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    phone: '',
    street: '',
    postalCode: '',
    city: '',
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.nombre,
        email: data.email,
        phone: data.telefono1,
        street: data.calle,
        postalCode: data.distrito,
        city: data.ciudad,
      },
    });
  };

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'repairs') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, user, route } = this.state;
    return (
      <div className='App'>
        <NavBar isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === 'repairs' ? (
          <div>
            <Scroll>
              <RepairList user={user} loadRepairs={this.loadRepairs} />
            </Scroll>
          </div>
        ) : route === 'signin' ? (
          <Scroll>
            <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          </Scroll>
        ) : route === 'register' ? (
          <Scroll>
            <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          </Scroll>
        ) : (
          <Scroll>
            <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          </Scroll>
        )}
      </div>
    );
  }
}

export default App;
