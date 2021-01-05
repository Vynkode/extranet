import React from 'react';
import Tabs from '../Tabs/Tabs';
import './Repair.css';

const Repair = ({ number, reference, entrydate, brand, model, type, warranty, budget, repdate, repair, cost, send, delivered, fault, remark }) => {
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
        </div>
        <div>
          <h5>Prespuesto</h5>
          <p>Aquí estarán los datos del presupuesto</p>
        </div>
        <div>
          <h5>Entrega</h5>
          <p>Aquí estarán los datos del envío</p>
        </div>
      </Tabs>
    </div>
  );
};

export default Repair;
