import React from 'react';
import Tabs from '../Tabs/Tabs';
import './Repair.css';

const Repair = ({
  number,
  reference,
  photo,
  warranty,
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
  repair,
  bill,
  delivertype,
  delivereddate,
  send,
  delivered,
}) => {
  // console.log('Render: Repair');
  return (
    <div className='card'>
      <div className='repair-info'>
        <div className='number center'>{number}</div>
        <div className='number-customer center'>Ref.: {reference}</div>
        <img className='watch center' src={'https://cdn.shopify.com/s/files/1/1250/8273/products/BGA-190BE-2AJF_grande.png?v=1498996209'} />
        <div className='repair-type center'>{warranty}</div>
      </div>
      <Tabs icons={['inbox', 'tools', 'receipt', 'check']} budget={budget}>
        <div>
          <h5>Resguardo</h5>
          <div className='tag-data'>
            <span className='tag'>F. Entrada</span>
            <span className='data'>{entrydate}</span>
          </div>
          <div className='tag-data'>
            <span className='tag'>Marca</span>
            <span className='data'>{brand}</span>
            <br></br>
            <span className='tag'>Modelo</span>
            <span className='data'>{model}</span>
            <br></br>
            <span className='tag'>Tipo</span>
            <span className='data'>{type}</span>
          </div>
          <div className='tag-data'>
            <span className='tag'>Avería</span>
            <br></br>
            <span className='data-fault'>{fault}</span>
          </div>
          <div className='tag-data'>
            <span className='tag'>Observaciones</span>
            <br></br>
            <span className='data-remark'>{remark}</span>
          </div>
        </div>
        <div>
          <h5>Reparación</h5>
          <div className='tag-data'>
            <span className='tag'>F. Reparación</span>
            <span className='data'>{repdate}</span>
          </div>
          <div className='tag-data'>
            <span className='tag'>Reparación</span>
            <br></br>
            <span className='data-remark'>{repair}</span>
          </div>
          <div className='tag-data'>
            <span className='tag-cost'>Precio</span>
            <br></br>
            <span className='data'>{bill} € (+ IVA)</span>
          </div>
        </div>
        <div>
          <h5>Prespuesto</h5>
          <div className='tag-data'>
            <span className='tag'>F. Presupuesto</span>
            <span className='data'>{budgetdate}</span>
          </div>
          <div className='tag-data'>
            <span className='tag'>Presupuesto</span>
            <br></br>
            <span className='data-remark'>{budgetrepair}</span>
          </div>
          <div className='tag-data'>
            <span className='tag'>F. Respuesta</span>
            <span className='data'>{budgetdateanswer}</span>
          </div>
          <div className='tag-data'>
            <span className='tag'>Aceptado</span>
            <span className='data'>{budgetaccept}</span>
          </div>
          <div className='tag-data'>
            <span className='tag-cost'>Precio</span>
            <br></br>
            <span className='data'>{budgetprice} € (+ IVA)</span>
          </div>
        </div>
        <div>
          <h5>Entrega</h5>
          <div className='tag-data'>
            <span className='tag'>Tipo Entrega</span>
            <span className='data'>{delivertype}</span>
          </div>
          <div className='tag-data'>
            <span className='tag'>F. Entrega</span>
            <span className='data'>{delivereddate}</span>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default Repair;
