import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import noImage from './no-image.png';
import './Repairfull.css';
import BudgetButton from '../Button/BudgetButton';

const Repairfull = ({
  id,
  number,
  reference,
  photo,
  warranty,
  warrantydate,
  entrydate,
  brand,
  model,
  type,
  refmodel,
  accesories,
  fault,
  remark,
  budget,
  budgetdate,
  budgetdateanswer,
  budgetreject,
  budgetrepair,
  budgetprice,
  repdate,
  replacementmodel,
  repair,
  bill,
  delivertype,
  delivereddate,
  send,
  delivered,
  process,
  handleRepairsBudget,
}) => {
  // console.log('Render: Repair');
  const handleBudgetStatus = () => {
    if (budget === 'Sí' && budgetdateanswer && budgetreject === 'No') return 1;
    if (budget === 'Sí' && budgetdateanswer && budgetreject !== 'No') return 2;
    return 0;
  };

  const [budgetStatus, setBudgetStatus] = useState(handleBudgetStatus);

  const handleBudget = async accepted => {
    const url = `https://extranet-backend.herokuapp.com/budget${
      accepted ? 'accept' : 'reject'
    }`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ numero: number }),
    });
    const data = await response.json();

    if (response.status !== 200) return console.log(data);
    handleRepairsBudget(id, accepted);

    if (accepted) setBudgetStatus(1);
    if (!accepted) setBudgetStatus(2);
  };

  return (
    <article className="card-full">
      <section className="repair-info-full">
        <div className="process-status">{process}</div>
        <div className="number center">{number}</div>
        <div className="number-customer center">
          <span>Su Referencia:</span>
          <span>{reference}</span>
        </div>
        <img className="watch center" src={noImage} alt={'repair photo'} />
        <div className="repair-type center">{warranty}</div>
        <div className="repair-type center">{warrantydate}</div>
      </section>
      <section className="resguardo-full">
        <header>Resguardo</header>
        <div className="main">
          <div className="left">
            <div className="left-tag-data">
              <span className="tag">F. Entrada</span>
              <span className="data">{entrydate}</span>
            </div>
            <ul className="left-ul-data">
              <span className="tag">Accesorios</span>
              {accesories ? (
                accesories.map((acc, i) => {
                  return (
                    <li key={i} className="data-li">
                      {acc}
                    </li>
                  );
                })
              ) : (
                <></>
              )}
            </ul>
          </div>
          <div className="right">
            <div className="right-tag-data">
              <span className="tag">Marca</span>
              <span className="data">{brand}</span>
              <span className="tag">Modelo</span>
              <span className="data">
                {brand === 'CASIO' ? model : refmodel}
              </span>
              <span className="tag">Tipo</span>
              <span className="data">
                {brand === 'CASIO' ? type : type + ' ' + model}
              </span>
            </div>
          </div>
        </div>
        <div className="tag-data">
          <span className="tag left">Avería</span>
          <span className="data-fault left">{fault}</span>
        </div>
        <div className="tag-data">
          <span className="tag left">Observaciones</span>
          <span className="data-remark left">{remark}</span>
        </div>
      </section>
      {process !== 1 && budget === 'Sí' ? (
        <section className="presupuesto-full">
          <header>Prespuesto</header>
          <div className="main">
            <div className="left">
              <div className="left-tag-data">
                <span className="tag">F. Presupuesto</span>
                <span className="data">{budgetdate}</span>
                <span className="tag">Aceptado</span>
                <span className="data">
                  {budgetreject === 'No' && !budgetdateanswer
                    ? '-'
                    : budgetreject === 'No'
                    ? 'Sí'
                    : 'No'}
                </span>
              </div>
            </div>
            <div className="right">
              <div className="right-tag-data">
                <span className="tag">F. Respuesta</span>
                <span className="data">{budgetdateanswer}</span>
              </div>
            </div>
          </div>
          <div className="tag-data">
            <span className="tag left">Presupuesto</span>
            <span className="data-remark left">{budgetrepair}</span>
          </div>
          <div className="main" style={{ marginTop: '1em' }}>
            {budget === 'Sí' && !budgetdateanswer ? (
              <BudgetButton handleBudget={handleBudget} />
            ) : (
              <div className="left">
                <div
                  className={
                    budgetStatus === 1 ? 'stamp is-approved' : 'stamp is-nope'
                  }
                >
                  {budgetStatus === 1 ? 'Aceptado' : 'Rechazado'}
                </div>
              </div>
            )}
            {budgetprice > 0 ? (
              <div className="right">
                <div className="right-tag-data">
                  <span className="tag right">Precio</span>
                  <span className="data right">
                    {budgetprice} € (IVA incl.)
                  </span>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </section>
      ) : (
        <></>
      )}
      {}
      <section className="reparacion-full">
        <header>Reparación</header>
        <div className="main">
          <div className="left">
            <div className="left-tag-data">
              <span className="tag">F. Reparación</span>
              <span className="data">{repdate}</span>
            </div>
          </div>
          {replacementmodel ? (
            <div className="right">
              <div className="right-tag-data">
                <span className="tag">Cambio reloj</span>
                <span className="data">{replacementmodel}</span>
              </div>
            </div>
          ) : (
            <div className="right">
              <div className="right-tag-data" />
            </div>
          )}
        </div>
        <div className="tag-data">
          <span className="tag left">Reparación</span>
          <span className="data-remark left">{repair}</span>
        </div>
        {bill > 0 ? (
          <div className="tag-data">
            <span className="tag right">Precio</span>
            <span className="data right">{bill} € (IVA incl.)</span>
          </div>
        ) : (
          <></>
        )}
      </section>
      <section className="entrega-full">
        <header>Entrega / Envío</header>
        <div className="main">
          <div className="left">
            <div className="left-tag-data">
              <span className="tag">F. Entrega</span>
              <span className="data">{delivereddate}</span>
            </div>
          </div>
          <div className="right">
            <div className="right-tag-data">
              {/*<span className="tag">Tipo Entrega</span>*/}
              {/*<span className="data">{delivertype}</span>*/}
              {/*<span className="tag">Agencía</span>*/}
              {/*<span className="data">{send}</span>*/}
            </div>
          </div>
        </div>
      </section>
    </article>
  );
};

export default Repairfull;
