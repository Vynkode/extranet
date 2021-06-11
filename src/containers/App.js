import React, { Component } from 'react';
import Signin from '../components/Signin/Signin';
import Scroll from '../components/Scroll/Scroll';
import NavBar from '../components/NavBar/NavBar';
import RepairList from '../components/RepairList/RepairList';
import Register from '../components/Register/Register';
import UpdatePassword from '../components/UpdatePassword/UpdatePassword';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faInstagram,
  faFacebookSquare,
} from '@fortawesome/free-brands-svg-icons';
import {
  faInbox,
  faTools,
  faReceipt,
  faCheck,
  faSpinner,
  faUser,
  faFilePdf,
  faSignOutAlt,
  faTimes,
  faIdBadge,
  faIdCard,
  faSyncAlt,
  faBusinessTime,
} from '@fortawesome/free-solid-svg-icons';

import './App.css';

library.add(
  faInbox,
  faTools,
  faReceipt,
  faCheck,
  faSpinner,
  faUser,
  faFilePdf,
  faSignOutAlt,
  faTimes,
  faInstagram,
  faFacebookSquare,
  faIdBadge,
  faIdCard,
  faSyncAlt,
  faBusinessTime
);

const initialState = {
  modalOpen: false,
  route: '',
  isSignedIn: false,
  widthWindow: '',
  user: {
    id: '',
    name: '',
    company: '',
    taxID: '',
    email: '',
    phone: '',
    street: '',
    postalCode: '',
    city: '',
    state: '',
    contact: '',
    fax: '',
    retailer: false,
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = user => {
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
        retailer: user.distribuidor,
        firstTime: user.first_time,
      },
    });
  };

  onToken = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(
        'https://extranet-backend.herokuapp.com/signintoken',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 401) {
        localStorage.removeItem('token');
        this.onRouteChange('signin');
      }
      const { user } = await response.json();
      if (user.id) {
        this.loadUser(user);
        this.onRouteChange('repairs');
      }
    } catch (e) {
      console.log(e);
    }
  };

  onRouteChange = route => {
    if (route === 'signout') {
      this.setState(initialState);
      return this.setState({ route: 'signin' });
    } else if (route === 'repairs') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  handleChangePassword = data => {
    this.setState({ user: { ...data, firstTime: false } });
  };

  componentDidMount() {
    if (localStorage.getItem('token')) {
      Promise.resolve(this.onToken());
    } else {
      this.onRouteChange('signin');
    }
    this.setState({
      widthWindow:
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth,
    });
    window.addEventListener('resize', () => {
      this.setState({
        widthWindow:
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth,
      });
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => {
      this.setState({
        widthWindow:
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth,
      });
    });
  }

  render() {
    const { isSignedIn, user, route, modalOpen, widthWindow } = this.state;
    return (
      <div className="App">
        <NavBar
          isSignedIn={isSignedIn}
          width={widthWindow}
          user={user}
          onRouteChange={this.onRouteChange}
          toggleModal={this.toggleModal}
        />
        {user.firstTime ? (
          <UpdatePassword
            user={user}
            handleChangePassword={this.handleChangePassword}
          />
        ) : route === 'repairs' ? (
          <div>
            <Scroll>
              <RepairList
                user={user}
                width={widthWindow}
                loadRepairs={this.loadRepairs}
              />
            </Scroll>
          </div>
        ) : route === 'signin' ? (
          <Scroll>
            <Signin
              loadUser={this.loadUser}
              width={widthWindow}
              onRouteChange={this.onRouteChange}
            />
          </Scroll>
        ) : route === 'register' ? (
          <Scroll>
            <Register
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          </Scroll>
        ) : route === 'pdf' ? (
          <Scroll>
            <ResguardoPDF data={user} />
          </Scroll>
        ) : (
          <Scroll />
        )}
      </div>
    );
  }
}

export default App;
