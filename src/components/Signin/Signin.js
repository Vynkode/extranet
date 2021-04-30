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

  const onSubmitSignIn = async e => {
    e.preventDefault();
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
        errorDiv.textContent = '';
      }, 2500);
    }
  };

  return (
    <article id="signin">
      <form id="signin-form" action="">
        <header>ACCESO CLIENTE</header>
        <div className="errorSignin" />
        <label htmlFor="email-address">Email</label>
        <input
          type="email"
          name="email-address"
          id="email-address"
          onChange={onEmailChange}
        />
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={onPasswordChange}
        />
        <button type="submit" id="submit-signin" onClick={onSubmitSignIn}>
          Entrar
        </button>
      </form>
    </article>
  );
};

export default Signin;
