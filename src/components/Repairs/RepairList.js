import React, { useState, useEffect, Suspense, lazy } from 'react';
import moment from 'moment';
import SearchBox from '../SearchBox/SearchBox';
const Repair = lazy(() => import('./Repair'));
import Loading from '../Loading/Loading';
// import Repair from './Repair';
import './RepairList.css';

const RepairList = ({ user }) => {
  const [count, setCount] = useState('');
  const [repairs, setRepairs] = useState([]);
  const [searchfield, setSearchfield] = useState('');
  const [filteredrepairs, setFilteredrepairs] = useState([]);
  const [filteroption, setFilteroption] = useState(1);
  const [type, setType] = React.useState('workshop');

  const fetchRepairs = async () => {
    console.log(user);
    const response = await fetch(`https://extranet-backend.herokuapp.com/repairsworkshop/${user.email}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const json = await response.json();
    // console.log(json);
    setRepairs(json[1]);
    setCount(json[0]);
  };
  //     .then(function (response) {
  //       if (response.status === 200) {
  //         return response.json();
  //       }
  //     })
  //     .then((response) => setRepairs(response));
  // };

  const filterInitial = (value) => {
    setSearchfield(value);
  };

  const onFilterChange = (event) => {
    setFilteroption(event.target.value);
    console.log('el filtro es', filteroption);
  };

  const onSearchChange = (event) => {
    setSearchfield(event.target.value);
    console.log(searchfield);
  };

  const handleType = (type) => {
    if (type === 'closed') {
      setType(type);
    } else {
      setType(type);
    }
  };

  useEffect(() => {
    // console.log('Cargando reparaciones');
    fetchRepairs();
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
    const results = repairs.filter((repair) => {
      if (filteroption === 1) {
        return repair.numero.toString().includes(searchfield);
      } else if (filteroption === 2) {
        return repair.su_referencia.toString().includes(searchfield);
      } else if (filteroption === 3) {
        return repair.modelo.toLowerCase().includes(searchfield.toLowerCase());
      } else if (filteroption === 4) {
        return repair.f_entrada.includes(moment(searchfield).format('DD/MM/YY'));
      }
    });
    setFilteredrepairs(results);
    console.log(filteredrepairs);
  }, [searchfield]);

  // console.log('Render: RepairList');
  return (
    <div>
      <SearchBox filterInitial={filterInitial} searchChange={onSearchChange} handleChange={onFilterChange} handleType={handleType} />
      <div className='container'>
        <Suspense fallback={<Loading />}>
          {filteredrepairs.map((filteredrepair, i) => {
            return (
              <Repair
                key={i}
                number={filteredrepair.numero}
                reference={filteredrepair.su_referencia}
                entrydate={filteredrepair.f_entrada}
                brand={filteredrepair.marca}
                model={filteredrepair.modelo}
                type={filteredrepair.tipo_aparato}
                warranty={filteredrepair.tipo_reparacion}
                fault={filteredrepair.averia}
                remark={filteredrepair.observaciones}
                budget={filteredrepair.presupuestar}
                repdate={filteredrepair.f_reparacion}
                repair={filteredrepair.reparacion}
                cost={filteredrepair.cost}
                send={filteredrepair.send}
                delivered={filteredrepair.delivered}
              />
            );
          })}
        </Suspense>
      </div>
    </div>
  );
};

export default RepairList;
