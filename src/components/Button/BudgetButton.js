import React, { useState } from 'react';
import './BudgetButton.css';

const BudgetButton = ({ handleBudget }) => {
  // const handleButton = data => {
  //   if (data === 'Aceptado') {
  //     console.log(`You ${data} your budget`);
  //     handleBudget(id, true);
  //   }
  //   if (data === 'Rechazado') {
  //     console.log(`You ${data} your budget`);
  //     setBudgetStatus(2);
  //     handleBudget(false);
  //   }
  // };

  return (
    <aside className="budget-buttons">
      <button
        value="Aceptado"
        className="budget-button accept"
        onClick={() => handleBudget(true)}
      >
        Aceptar
      </button>
      <button
        value="Rechazado"
        className="budget-button reject"
        onClick={() => handleBudget(false)}
      >
        Rechazar
      </button>
    </aside>
  );
};

export default BudgetButton;
