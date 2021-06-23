import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './CommentsModal.css';

const CommentsModal = ({ user, repair, commentShow, setCommentShow }) => {
  const [comment, setComment] = useState('');

  const sendComment = () => {};

  return (
    <div className="comment-modal-container">
      <div className="comment-modal-header">
        <p>Envie su comentario</p>
        <FontAwesomeIcon
          onClick={() => setCommentShow(false)}
          className="times-close"
          icon="times"
        />
      </div>
      <div className="comment-modal-repair-info">
        <p>{`Escriba su comentario de la reparación ${repair.numero}`}</p>
      </div>
      <div className="comment-modal-text">
        <textarea onChange={e => setComment(e.target.value)} />
        <button className="comment-modal-button">Enviar</button>
      </div>
    </div>
  );
};

export default CommentsModal;
