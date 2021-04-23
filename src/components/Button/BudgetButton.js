import React, { useState } from 'react';
import './BudgetButton.css';

const BudgetButton = () => {
  const [clicked, setClicked] = useState(false);
  const [accepted, setAccepted] = useState('');

  const handleBudget = data => {
    if (data === 'Aceptado') {
      console.log(`You ${data} your budget`);
      setClicked(true);
      setAccepted(data);
    }
    if (data === 'Rechazado') {
      console.log(`You ${data} your budget`);
      setClicked(true);
      setAccepted(data);
    }
  };

  return !clicked ? (
    <aside className="budget-buttons">
      <button
        value="Aceptado"
        className="budget-button accept"
        onClick={e => handleBudget(e.target.value)}
      >
        Aceptar
      </button>
      <button
        value="Rechazado"
        className="budget-button reject"
        onClick={e => handleBudget(e.target.value)}
      >
        Rechazar
      </button>
    </aside>
  ) : (
    <div
      className={
        accepted === 'Aceptado' ? 'stamp is-approved' : 'stamp is-nope'
      }
    >
      {accepted}
    </div>
  );
};

export default BudgetButton;
