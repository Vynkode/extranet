import React from 'react';

const TabResguardo = (props) => {
  console.log(props);
  const { entrydate, brand, model, type, fault, remark } = props.data;
  return (
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
  );
};

export default TabResguardo;
