import React, { useState, useEffect } from 'react';
import './UpdatePassword.css';

const UpdatePassword = ({ user, handleChangePassword }) => {
  const [actualPassword, setActualPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const contable = user.id.slice(0, -2);
  const codigo = user.id.slice(-2);

  console.log([contable, codigo]);

  let errorDiv, actualPasswordDiv, newPasswordDiv;
  useEffect(() => {
    errorDiv = document.querySelector('.errorSignin');
    actualPasswordDiv = document.querySelector('#actual-password');
    newPasswordDiv = document.querySelector('#new-password');
  }, []);

  const handleActualPassword = e => {
    setActualPassword(e.target.value);
  };

  const handleNewPassword = e => {
    setNewPassword(e.target.value);
  };

  const handleSubmitPassword = async e => {
    e.preventDefault();
    try {
      const response = await fetch(
        'https://extranet-backend.herokuapp.com/updatepasswordlogin',
        {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contable: contable,
            codigo: codigo,
            actualPassword,
            newPassword,
          }),
        }
      );
      if (response.status === 401)
        throw new Error('Ha ocurrido un error, intentalo de nuevo mas tarde');
      handleChangePassword(user);
    } catch (err) {
      errorDiv.textContent = err.message;
      errorDiv.classList.toggle('error');
      actualPasswordDiv.classList.toggle('border-error');
      newPasswordDiv.classList.toggle('border-error');
      setTimeout(() => {
        errorDiv.classList.toggle('error');
        actualPasswordDiv.classList.toggle('border-error');
        newPasswordDiv.classList.toggle('border-error');
        errorDiv.textContent = '';
      }, 2500);
    }
  };

  return (
    <article id="update-password">
      <form id="update-password-form" action="">
        <div className="errorSignin" />
        <header>Cambio de contraseña</header>
        <p>
          Muchas gracias por usar nuestro servicio online. En el email de acceso
          le facilitamos los datos de su usuario, con el fin de mantener la
          privacidad y la seguridad de sus datos le solicitamos que cambie la
          contraseña en el primer acceso a su cuenta
        </p>
        <label htmlFor="actual-password">Contraseña actual</label>
        <input
          type="password"
          name="actual-password"
          onChange={handleActualPassword}
          id="actual-password"
        />
        <label htmlFor="new-password">Nueva contraseña</label>
        <input
          type="password"
          name="new-password"
          onChange={handleNewPassword}
          id="new-password"
        />
        <button
          type="submit"
          id="submit-password"
          onClick={handleSubmitPassword}
        >
          Guardar
        </button>
      </form>
    </article>
  );
};

export default UpdatePassword;
