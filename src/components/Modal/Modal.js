import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Modal.css';

const Modal = ({ show, close, data }) => {
  return (
    <div className={show ? 'modal-wrapper show' : 'modal-wrapper'}>
      <div className='modal-header'>
        <p>TUS DATOS</p>
        <FontAwesomeIcon onClick={close} className='times-close' icon='times' />
        {/* <span onClick={close}>x</span> */}
      </div>
      <div className='modal-content'>
        <div className='modal-body'>
          {data.retailer ? (
            <>
              <div>
                <span className='tag-title'>Nombre</span>
                <span className='tag-desc'>{data.name}</span>
              </div>

              <div>
                <span className='tag-title'>Razon Social</span>
                <span className='tag-desc'>{data.company}</span>
              </div>
            </>
          ) : (
            <div>
              <span className='tag-title'>Nombre</span>
              <span className='tag-desc'>{data.company}</span>
            </div>
          )}
          <div>
            <span className='tag-title'>Email</span>
            <span className='tag-desc'>{data.email}</span>
          </div>
          <div>
            <span className='tag-title'>Teléfono</span>
            <span className='tag-desc'>{data.phone}</span>
          </div>
          <div className='address'>
            <span className='tag-title'>Dirección</span>
            <span className='tag-desc'>{data.street}</span>
            <span className='tag-desc'>{data.postalCode}</span>
            <span className='tag-desc'>{data.city}</span>
          </div>
        </div>
        <div className='modal-footer'>
          <button onClick={close} className='btn-cancel'>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
