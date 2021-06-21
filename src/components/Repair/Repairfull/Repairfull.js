import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import noImage from '../../../assets/img/no-image.png';
import './Repairfull.css';
import BudgetButton from '../../Button/BudgetButton';
import ModalPDF from '../../Modals/ModalPDF';
import MailtoButton from '../../Button/MailtoButton';

const Repairfull = ({ id, user, repair, handleRepairsBudget }) => {
  const [pdfShow, setPdfShow] = useState(false);

  const handleBudgetStatus = () => {
    if (
      repair.presupuestar === 'Sí' &&
      repair.f_respuesta_ppto &&
      repair.rechazado === 'No'
    )
      return 1;
    if (
      repair.presupuestar === 'Sí' &&
      repair.f_respuesta_ppto &&
      repair.rechazado !== 'No'
    )
      return 2;
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
      body: JSON.stringify({ numero: repair.numero }),
    });
    const data = await response.json();

    if (response.status !== 200) return console.log(data);
    handleRepairsBudget(id, accepted);

    if (accepted) setBudgetStatus(1);
    if (!accepted) setBudgetStatus(2);
  };

  return (
    <article className="card-full">
      {pdfShow ? (
        <>
          <div onClick={() => setPdfShow(false)} className="back-drop-pdf" />
          <ModalPDF
            user={user}
            repair={repair}
            pdfShow={pdfShow}
            setPdfShow={setPdfShow}
          />
        </>
      ) : null}

      <section className="repair-info-full">
        <div className="process-status">
          {repair.procesoEstado}
          <MailtoButton repair={repair.numero} />
        </div>
        <div className="number center">{repair.numero}</div>
        <div className="number-customer center">
          <span>Su Referencia:</span>
          <span>{repair.su_referencia}</span>
        </div>
        <img className="watch center" src={noImage} alt={'repair photo'} />
        <div className="repair-type center">{repair.tipo_reparacion}</div>
        <div className="repair-type center">{repair.fecha_compra}</div>
        <FontAwesomeIcon
          onClick={() => setPdfShow(true)}
          icon="file-pdf"
          className="pdf-icon"
        />
      </section>
      <section className="resguardo-full">
        <header>Resguardo</header>
        <div className="main">
          <div className="left">
            <div className="left-tag-data">
              <span className="tag">F. Entrada</span>
              <span className="data">{repair.f_entrada}</span>
            </div>
            <ul className="left-ul-data">
              <span className="tag">Accesorios</span>
              {repair.accesorios ? (
                repair.accesorios.map((acc, i) => {
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
              <span className="data">{repair.marca}</span>
              <span className="tag">Modelo</span>
              <span className="data">
                {repair.marca === 'CASIO' ? repair.modelo : repair.ref2}
              </span>
              <span className="tag">Tipo</span>
              <span className="data">
                {repair.marca === 'CASIO'
                  ? repair.tipo_aparato
                  : repair.tipo_aparato + ' ' + repair.modelo}
              </span>
            </div>
          </div>
        </div>
        <div className="tag-data">
          <span className="tag left">Avería</span>
          <span className="data-fault left">{repair.averia}</span>
        </div>
        <div className="tag-data">
          <span className="tag left">Observaciones</span>
          <span className="data-remark left">{repair.observaciones}</span>
        </div>
      </section>
      {repair.procesoEstado !== 1 && repair.presupuestar === 'Sí' ? (
        <section className="presupuesto-full">
          <header>Prespuesto</header>
          <div className="main">
            <div className="left">
              <div className="left-tag-data">
                <span className="tag">F. Presupuesto</span>
                <span className="data">{repair.f_presupuesto}</span>
                <span className="tag">Aceptado</span>
                <span className="data">
                  {repair.rechazado === 'No' && !repair.f_respuesta_ppto
                    ? '-'
                    : repair.rechazado === 'No'
                    ? 'Sí'
                    : 'No'}
                </span>
              </div>
            </div>
            <div className="right">
              <div className="right-tag-data">
                <span className="tag">F. Respuesta</span>
                <span className="data">{repair.f_respuesta_ppto}</span>
              </div>
            </div>
          </div>
          <div className="tag-data">
            <span className="tag left">Presupuesto</span>
            <span className="data-remark left">{repair.presupuesto}</span>
          </div>
          <div className="main" style={{ marginTop: '1em' }}>
            {repair.presupuestar === 'Sí' && !repair.f_respuesta_ppto ? (
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
            {repair.p_liquido > 0 ? (
              <div className="right">
                <div className="right-tag-data">
                  <span className="tag right">Precio</span>
                  <span className="data right">
                    {repair.p_liquido} € (IVA incl.)
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
              <span className="data">{repair.f_reparacion}</span>
            </div>
          </div>
          {repair.modelo_sustutucion ? (
            <div className="right">
              <div className="right-tag-data">
                <span className="tag">Cambio reloj</span>
                <span className="data">{repair.modelo_sustutucion}</span>
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
          <span className="data-remark left">{repair.reparacion}</span>
        </div>
        {repair.f_liquido > 0 ? (
          <div className="tag-data">
            <span className="tag right">Precio</span>
            <span className="data right">{repair.f_liquido} € (IVA incl.)</span>
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
              <span className="data">{repair.f_entrega}</span>
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

// ReactDOM.render(<RepairPDF />, document.getElementById('pdf'));

export default Repairfull;
