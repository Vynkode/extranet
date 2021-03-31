import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Repairfull.css';

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
  const processStatus = function (p) {
    switch (p) {
      case 1:
        return 'RESGUARDO';
      case 2:
      case 3:
        return 'PRESUPUESTO';
      case 4:
        return 'EN REPARACIÓN';
      case 5:
      case 7:
      case 9:
        return 'ESPERA MATERIAL';
      case 6:
        return 'FACTURACIÓN';
      case 8:
        return 'ENTREGADA';
    }
  };

  const accesorios = ['plata', 'correa', 'color', 'forma', 'dibujo'];

  return (
    <article className="card-full">
      <section className="process-status-outer">
        <header className="process-status-inner">
          {processStatus(process)}
        </header>
        <aside className="pdf-icon-full">
          <a>
            {/*onClick={<RepairPdf />}*/}
            <FontAwesomeIcon className="icon" icon={['fas', 'file-pdf']} />
          </a>
        </aside>
      </section>
      <section className="repair-info-full">
        <div className="number center">{number}</div>
        <div className="number-customer center">Ref.: {reference}</div>
        <img
          className="watch center"
          src={'https://www.casio-intl.com/product/image/1425303494438/'}
          alt={'repair photo'}
        />
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
              <li className="data-li">{accesorios[0]}</li>
              <li className="data-li">{accesorios[1]}</li>
              <li className="data-li">{accesorios[2]}</li>
              <li className="data-li">{accesorios[3]}</li>
              <li className="data-li">{accesorios[4]}</li>
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
                <span className="data">{budgetaccept}</span>
              </div>
            </div>
            <div className="right">
              <div className="right-tag-data">
                <span className="tag">F. Respuesta</span>
                <span className="data">{budgetdateanswer}</span>
                <span className="tag">Aceptado</span>
                <span className="data">{budgetaccept}</span>
              </div>
            </div>
          </div>
          <div className="tag-data">
            <span className="tag left">Presupuesto</span>
            <span className="data-remark left">{budgetrepair}</span>
          </div>
          <div className="tag-data">
            <span className="tag right">Precio</span>
            <span className="data right">{budgetprice} € (IVA incl.)</span>
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
          {number ? (
            <div className="right">
              <div className="right-tag-data">
                <span className="tag">Cambio reloj</span>
                <span className="data">Sí</span>
                <span className="tag">Modelo</span>
                <span className="data">{model}</span>
              </div>
            </div>
          ) : (
            <div className="right">
              <div className="right-tag-data">
                <span className="tag">Cambio reloj</span>
                <span className="data">No</span>
              </div>
            </div>
          )}
        </div>
        <div className="tag-data">
          <span className="tag left">Reparación</span>
          <span className="data-remark left">{repair}</span>
        </div>
        <div className="tag-data">
          <span className="tag right">Precio</span>
          <span className="data right">{bill} € (IVA incl.)</span>
        </div>
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
              <span className="tag">Tipo Entrega</span>
              <span className="data">{delivertype}</span>
              <span className="tag">Agencía</span>
              <span className="data">{send}</span>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
};

export default Repairfull;
