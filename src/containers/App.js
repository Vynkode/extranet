import React, { Component } from 'react';
import Signin from '../components/Signin/Signin';
import Scroll from '../components/Scroll/Scroll';
import NavBar from '../components/NavBar/NavBar';
import RepairList from '../components/Repairs/RepairList';
import Register from '../components/Register/Register';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faInbox, faTools, faReceipt, faCheck, faSpinner, faUser } from '@fortawesome/free-solid-svg-icons';
import './App.css';

library.add(faInbox, faTools, faReceipt, faCheck, faSpinner, faUser);

const initialState = {
  route: 'repairs',
  isSignedIn: true,
  user: {
    id: '',
    name: '',
    company: '',
    taxID: '',
    email: 'resparea04_sabadell@elcorteingles.es',
    phone: '',
    street: '',
    postalCode: '',
    city: '',
    state: '',
    contact: '',
    fax: '',
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (user) => {
    this.setState({
      user: {
        id: user.id,
        name: user.nombre,
        company: user.razon_social,
        taxID: user.nif,
        email: user.email,
        phone: user.telefono1,
        street: user.calle,
        postalCode: user.distrito,
        city: user.ciudad,
        state: user.provincia,
        contact: user.contacto,
        fax: user.fax,
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
        <NavBar isSignedIn={isSignedIn} user={user} onRouteChange={this.onRouteChange} />
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
