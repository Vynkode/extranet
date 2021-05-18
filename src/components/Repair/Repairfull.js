import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import noImage from './no-image.png';
import './Repairfull.css';
import BudgetButton from '../Button/BudgetButton';

const Repairfull = ({
  number,
  reference,
  photo,
  warranty,
  warrantydate,
  entrydate,
  brand,
  model,
  type,
  accesories,
  fault,
  remark,
  budget,
  budgetdate,
  budgetdateanswer,
  budgetaccept,
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
}) => {
  // console.log('Render: Repair');

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
              <span className="data">{model}</span>
              <span className="tag">Tipo</span>
              <span className="data">{type}</span>
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
                  {budgetaccept === 'No' ? 'Sí' : 'No'}
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
              <BudgetButton />
            ) : (
              <div className="left"></div>
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
              <div className="right-tag-data"></div>
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
