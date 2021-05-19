import React, { useState, useEffect, Suspense, lazy } from 'react';
import moment from 'moment';
import SearchBox from '../SearchBox/SearchBox';
const Repair = lazy(() => import('../Repair/Repair'));
const Repairfull = lazy(() => import('../Repair/Repairfull'));
import Loading from '../Loading/Loading';
import './RepairList.css';

const RepairList = ({ user }) => {
  const [count, setCount] = useState('');
  const [repairs, setRepairs] = useState([]);
  const [searchfield, setSearchfield] = useState('');
  const [filteredrepairs, setFilteredrepairs] = useState([]);
  const [filteroption, setFilteroption] = useState(1);
  const [type, setType] = React.useState('workshop');

  const codigo = user.id.slice(0, -2);
  const dir = user.id.slice(-2);

  const fetchRepairs = async (codigo, dir, status) => {
    setCount('');
    setRepairs([]);
    const response = await fetch(
      `https://extranet-backend.herokuapp.com/repairs?codigo=${codigo}&dir=${dir}&status=${status}`,
      { method: 'GET', headers: { 'Content-Type': 'application/json' } }
    );
    const data = await response.json();
    setCount(data[0]);
    setRepairs(data[1]);
    console.log(data);
  };

  const fetchRepairsWorkshop = async () => {
    // console.log(user);
    setRepairs([]);
    setCount('');
    const response = await fetch(
      `https://extranet-backend.herokuapp.com/repairs?codigo=${codigo}&dir=${dir}&status=0`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const json = await response.json();
    // console.log(json);
    setCount(json[0]);
    setRepairs(json[1]);
    console.log(json);
  };

  const fetchRepairsClosed = async () => {
    setRepairs([]);
    setCount('');
    const response = await fetch(
      `https://extranet-backend.herokuapp.com/repairs?codigo=${codigo}&dir=${dir}&status=8`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const json = await response.json();
    setCount(json[0]);
    setRepairs(json[1]);
  };

  const filterInitial = value => {
    setSearchfield(value);
  };

  const onFilterChange = event => {
    setFilteroption(event.target.value);
    // console.log('el filtro es', filteroption);
  };

  const onSearchChange = event => {
    setSearchfield(event.target.value);
    // console.log(searchfield);
  };

  const handleType = type => {
    if (type === 'workshop') {
      fetchRepairsWorkshop();
      setType(type);
    }
    if (type === 'budget') {
      // fetchRepairsWorkshop();
      setType(type);
    }
    if (type === 'repair') {
      // fetchRepairsWorkshop();
      setType(type);
    }
    if (type === 'closed') {
      fetchRepairsClosed();
      setType(type);
    }
  };

  useEffect(() => {
    // console.log('Cargando reparaciones');
    fetchRepairsWorkshop();
    // console.log('Reparaciones cargadas');
    // console.log(repairs);
  }, []);

  useEffect(() => {
    // console.log('Cargando filtros');
    setFilteredrepairs(repairs);
    // console.log('Filtro cargado');
  }, [repairs]);

  useEffect(() => {
    // console.log('Filtrando');
    const results = repairs.filter(repair => {
      if (filteroption === 1) {
        return repair.numero.toString().includes(searchfield);
      } else if (filteroption === 2) {
        return repair.su_referencia.toString().includes(searchfield);
      } else if (filteroption === 3) {
        return repair.modelo.toLowerCase().includes(searchfield.toLowerCase());
      } else if (filteroption === 4) {
        return repair.f_entrada.includes(
          moment(searchfield).format('DD/MM/YY')
        );
      }
    });
    setFilteredrepairs(results);
    // console.log(filteredrepairs);
  }, [searchfield]);

  // console.log('Render: RepairList');
  return (
    <div>
      <SearchBox
        filterInitial={filterInitial}
        searchChange={onSearchChange}
        handleChange={onFilterChange}
        fetchRepairsWorkshop={fetchRepairsWorkshop}
        fetchRepairsClosed={fetchRepairsClosed}
        handleType={handleType}
        type={type}
        count={count}
      />
      <div className="container">
        <Suspense fallback={<Loading />}>
          {filteredrepairs.map((filteredrepair, i) => {
            return (
              <Repairfull
                key={i}
                number={filteredrepair.numero}
                reference={filteredrepair.su_referencia}
                photo={filteredrepair.foto_entrada}
                warranty={filteredrepair.tipo_reparacion}
                warrantydate={filteredrepair.fecha_compra}
                entrydate={filteredrepair.f_entrada}
                brand={filteredrepair.marca}
                model={filteredrepair.modelo}
                type={filteredrepair.tipo_aparato}
                refmodel={filteredrepair.ref2}
                accesories={filteredrepair.accesorios}
                fault={filteredrepair.averia}
                remark={filteredrepair.observaciones}
                budget={filteredrepair.presupuestar}
                budgetdate={filteredrepair.f_presupuesto}
                budgetdateanswer={filteredrepair.f_respuesta_ppto}
                budgetaccept={filteredrepair.rechazado}
                budgetrepair={filteredrepair.presupuesto}
                budgetprice={filteredrepair.p_liquido}
                repdate={filteredrepair.f_reparacion}
                replacementmodel={filteredrepair.modelo_sustutucion}
                repair={filteredrepair.reparacion}
                bill={filteredrepair.f_liquido}
                delivertype={filteredrepair.envio}
                delivereddate={filteredrepair.f_entrega}
                send={filteredrepair.agencia}
                delivered={filteredrepair.delivered}
                process={filteredrepair.procesoEstado}
              />
            );
          })}
        </Suspense>
      </div>
    </div>
  );
};

export default RepairList;
