import React, { Component } from 'react';
import Signin from '../components/Signin/Signin';
import Scroll from '../components/Scroll/Scroll';
import NavBar from '../components/NavBar/NavBar';
import RepairList from '../components/RepairList/RepairList';
import Register from '../components/Register/Register';
import Modal from '../components/Modal/Modal';
import { ResguardoPDF } from '../components/Pdf/Pdf';
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
  faIdCard
);

const initialState = {
  modalOpen: false,
  route: 'signin',
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
        retailer: user.distribuidor,
        firstTime: false,
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

  toggleModal = () => {
    if (this.state.modalOpen) {
      this.setState({ modalOpen: false });
    } else {
      this.setState({ modalOpen: true });
    }
  };

  componentDidMount() {
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
        {modalOpen ? (
          <div onClick={this.toggleModal} className="back-drop" />
        ) : null}
        <Modal data={user} close={this.toggleModal} show={modalOpen} />
        <NavBar
          isSignedIn={isSignedIn}
          width={widthWindow}
          user={user}
          onRouteChange={this.onRouteChange}
          toggleModal={this.toggleModal}
        />
        {route === 'repairs' ? (
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
          <Scroll>
            <Signin
              loadUser={this.loadUser}
              width={widthWindow}
              onRouteChange={this.onRouteChange}
            />
          </Scroll>
        )}
      </div>
    );
  }
}

export default App;
