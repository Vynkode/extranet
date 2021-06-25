import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './CommentsModal.css';

const CommentsModal = ({ user, repair, commentShow, setCommentShow }) => {
  const [comment, setComment] = useState('');
  const [commentStatus, setCommentStatus] = useState('');

  const handleComment = async msg => {
    const response = await fetch(
      'https://extranet-backend.herokuapp.com/repair/comment',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ numero: repair.numero, mensaje: msg }),
      }
    );
    const data = await response.json();
    console.log(data);
    setCommentStatus(data);
  };

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
        <button
          className="comment-modal-button"
          onClick={() => handleComment(comment)}
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default CommentsModal;
