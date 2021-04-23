import React, { useState, useEffect } from 'react';
import './Signin.css';

const Signin = ({ loadUser, width, onRouteChange }) => {
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  let errorDiv, emailDiv, passDiv;

  useEffect(() => {
    errorDiv = document.querySelector('.errorSignin');
    emailDiv = document.querySelector('#email-address');
    passDiv = document.querySelector('#password');
  });

  const onEmailChange = e => {
    setSignInEmail(e.target.value);
  };

  const onPasswordChange = e => {
    setSignInPassword(e.target.value);
  };

  const onSubmitSignIn = async () => {
    try {
      const response = await fetch(
        'https://extranet-backend.herokuapp.com/signin',
        {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: signInEmail,
            password: signInPassword,
          }),
        }
      );
      if (response.status === 400)
        throw new Error('El usuario y/o el password no son correctos');
      const user = await response.json();
      if (user.id) {
        loadUser(user);
        onRouteChange('repairs');
      }
    } catch (err) {
      errorDiv.textContent = err.message;
      errorDiv.classList.toggle('error');
      emailDiv.classList.toggle('border-error');
      passDiv.classList.toggle('border-error');
      setTimeout(() => {
        errorDiv.classList.toggle('error');
        emailDiv.classList.toggle('border-error');
        passDiv.classList.toggle('border-error');
      }, 2500);
    }
  };

  return (
    <article className="signin">
      {/*<div>{width}</div>*/}
      <main className="pa4 white" style={{ position: 'relative' }}>
        <div className="errorSignin" />
        <div className="measure">
          <fieldset id="sign-up" className="ba b--transparent ph0 mh0">
            <legend>Acceso cliente</legend>
            <div className="email-container">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                className="br2 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                onChange={onEmailChange}
              />
            </div>
            <div className="password-container">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Contraseña
              </label>
              <input
                className="br2 b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                onChange={onPasswordChange}
              />
            </div>
          </fieldset>
          <div className="">
            <input
              onClick={onSubmitSignIn}
              className="br2 b white ph3 pv2 input-reset ba b--white-50 bg-transparent grow pointer f6 dib"
              type="submit"
              value="Entrar"
            />
          </div>
        </div>
      </main>
    </article>
  );
};

export default Signin;
