import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ModalUser.css';

const ModalUser = ({ setShowModalUser, user }) => {
  return (
    <div className="modal-wrapper">
      <div className="modal-header">
        <p>TUS DATOS</p>
        <FontAwesomeIcon
          onClick={() => setShowModalUser(false)}
          className="times-close"
          icon="times"
        />
      </div>
      <div className="modal-content">
        <div className="modal-body">
          {user.retailer ? (
            <>
              <div>
                <span className="tag-title">Nombre</span>
                <span className="tag-desc">{user.name}</span>
              </div>

              <div>
                <span className="tag-title">Razón Social</span>
                <span className="tag-desc">{user.company}</span>
              </div>
            </>
          ) : (
            <div>
              <span className="tag-title">Nombre</span>
              <span className="tag-desc">{user.company}</span>
            </div>
          )}
          <div>
            <span className="tag-title">Email</span>
            <span className="tag-desc">{user.email}</span>
          </div>
          <div>
            <span className="tag-title">Teléfono</span>
            <span className="tag-desc">{user.phone}</span>
          </div>
          <div className="address">
            <span className="tag-title">Dirección</span>
            <span className="tag-desc">{user.street}</span>
            <span className="tag-desc">{user.postalCode}</span>
            <span className="tag-desc">{user.city}</span>
          </div>
        </div>
        <div className="modal-footer">
          <button
            onClick={() => setShowModalUser(false)}
            className="btn-cancel"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalUser;
