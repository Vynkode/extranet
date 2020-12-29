import React from 'react';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: '',
    };
  }

  onEmailChange = (event) => {
    console.log(event.target.value);
    this.setState({ signInEmail: event.target.value });
  };

  onPasswordChange = (event) => {
    console.log(event.target.value);
    this.setState({ signInPassword: event.target.value });
  };

  onSubmitSignIn = () => {
    fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.codigo) {
          this.props.loadUser(user);
          this.props.onRouteChange('repairs');
        }
      });
  };

  render() {
    const { onRouteChange } = this.props;
    return (
      <article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center' style={{ backgroundColor: '#272727' }}>
        <main className='pa4 white'>
          <div className='measure'>
            <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
              <legend className='f1 fw6 ph0 mh0'>Usuario</legend>
              <div className='mt3'>
                <label className='db fw6 lh-copy f6' htmlFor='email-address'>
                  Email
                </label>
                <input
                  className='br2 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                  type='email'
                  name='email-address'
                  id='email-address'
                  onChange={this.onEmailChange}
                />
              </div>
              <div className='mv3'>
                <label className='db fw6 lh-copy f6' htmlFor='password'>
                  Contraseña
                </label>
                <input
                  className='br2 b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                  type='password'
                  name='password'
                  id='password'
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className=''>
              <input onClick={this.onSubmitSignIn} className='br2 b white ph3 pv2 input-reset ba b--white-50 bg-transparent grow pointer f6 dib' type='submit' value='Entrar' />
            </div>
            {/* <div className='lh-copy mt3'>
              <p onClick={() => onRouteChange('register')} className='f6 link dim white db pointer'>
                Register
              </p>
            </div> */}
          </div>
        </main>
      </article>
    );
  }
}

export default Signin;
