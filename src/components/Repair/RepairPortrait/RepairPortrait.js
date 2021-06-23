import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import noImage from '../../../assets/img/no-image.png';
import './RepairPortrait.css';
import BudgetButton from '../../Button/BudgetButton';
import DownloadPdf from '../../Pdf/downloadPdf';
import MailtoButton from '../../Button/MailtoButton';
import ModalPDF from '../../Modals/PDF/ModalPDF';
import CommentsModal from '../../Modals/Comments/CommentsModal';

const Repair = ({ id, user, repair, handleRepairsBudget }) => {
  const [activeTab, setActiveTab] = useState('resguardo');
  const [pdf, setPdf] = useState(false);
  const [pdfDownload, setPdfDownload] = useState(false);
  const [commentShow, setCommentShow] = useState(false);

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
    <article className="card-portrait">
      {commentShow ? (
        <>
          <div
            onClick={() => setCommentShow(false)}
            className="back-drop-pdf"
          />
          <CommentsModal
            user={user}
            repair={repair}
            commentShow={commentShow}
            setCommentShow={setCommentShow}
          />
        </>
      ) : null}
      <section className="repair-info">
        <div className="process-status">{repair.procesoEstado}</div>
        <div className="repair-info-portrait">
          <div className="repair-info-data">
            <div className="number center">{repair.numero}</div>
            <div className="number-customer center">
              <span>Su Referencia:</span>
              <span>{repair.su_referencia}</span>
            </div>
            <div className="repair-type center">{repair.tipo_reparacion}</div>
            <div className="repair-type center">{repair.fecha_compra}</div>
            <FontAwesomeIcon
              icon="envelope"
              className="comment-icon"
              onClick={() => setCommentShow(true)}
            />
            {!pdf ? (
              <FontAwesomeIcon
                icon="file-pdf"
                className="pdf-icon"
                onClick={() => setPdf(true)}
              />
            ) : (
              <DownloadPdf
                user={user}
                repair={repair}
                setPdfDownload={setPdfDownload}
              />
            )}
            <div className={pdfDownload ? 'pdf-download show' : 'pdf-download'}>
              Descargado
            </div>
          </div>
          <img className="watch center" src={noImage} alt={'repair photo'} />
        </div>
      </section>
      <section className="tab-content">
        {activeTab === 'resguardo' ? (
          <article className="resguardo-portrait">
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
          </article>
        ) : (
          <></>
        )}
        {repair.procesoEstado !== 1 &&
        repair.presupuestar === 'Sí' &&
        activeTab === 'budget' ? (
          <article className="presupuesto-portrait">
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
          </article>
        ) : (
          <></>
        )}
        {activeTab === 'repair' ? (
          <article className="reparacion-portrait">
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
                <span className="data right">
                  {repair.f_liquido} € (IVA incl.)
                </span>
              </div>
            ) : (
              <></>
            )}
          </article>
        ) : (
          <></>
        )}
        {repair.f_entrega && activeTab === 'finished' ? (
          <article className="entrega-portrait">
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
          </article>
        ) : (
          <></>
        )}
      </section>
      <aside className="tabs-wrapper">
        <div
          className={`tab-btn ${activeTab === 'resguardo' ? 'active' : ''}`}
          onClick={() => setActiveTab('resguardo')}
        >
          <FontAwesomeIcon className="tab-icon" icon="inbox" />
        </div>
        <div
          className={`tab-btn ${
            repair.presupuestar === 'No'
              ? 'disabled'
              : activeTab === 'budget'
              ? 'active'
              : ''
          }`}
          onClick={() => setActiveTab('budget')}
        >
          <FontAwesomeIcon className="tab-icon" icon="receipt" />
        </div>
        <div
          className={`tab-btn ${activeTab === 'repair' ? 'active' : ''}`}
          onClick={() => setActiveTab('repair')}
        >
          <FontAwesomeIcon className="tab-icon" icon="tools" />
        </div>
        <div
          className={`tab-btn ${
            !repair.f_entrega
              ? 'disabled'
              : activeTab === 'finished'
              ? 'active'
              : ''
          }`}
          onClick={() => setActiveTab('finished')}
        >
          <FontAwesomeIcon className="tab-icon" icon="check" />
        </div>
      </aside>
    </article>
  );
};

export default Repair;
