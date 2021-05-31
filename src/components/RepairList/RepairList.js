import React, { lazy, Suspense, useEffect, useState } from 'react';
import moment from 'moment';
import SearchBox from '../SearchBox/SearchBox';
import Loading from '../Loading/Loading';
import './RepairList.css';

import { fetchRepairs } from '../../utils/repair-fetch';

const Repair = lazy(() => import('../Repair/Repair'));
const Repairfull = lazy(() => import('../Repair/Repairfull'));

const RepairList = ({ user }) => {
  const [count, setCount] = useState('');
  const [repairs, setRepairs] = useState([]);
  const [searchfield, setSearchfield] = useState('');
  const [filteredrepairs, setFilteredrepairs] = useState([]);
  const [filteroption, setFilteroption] = useState(1);
  const [type, setType] = React.useState('workshop');

  const codigo = user.id.slice(0, -2);
  const dir = user.id.slice(-2);

  const filterInitial = value => {
    setSearchfield(value);
  };

  const onFilterChange = event => {
    setFilteroption(event.target.value);
  };

  const onSearchChange = event => {
    setSearchfield(event.target.value);
  };

  const handleType = type => {
    if (type === 'workshop') {
      setRepairs([]);
      fetchRepairs(codigo, dir, 0).then(repairs => {
        setCount(repairs[0]);
        setRepairs(repairs[1]);
        setType(type);
      });
    }
    if (type === 'budget') {
      setRepairs([]);
      fetchRepairs(codigo, dir, 2).then(repairs => {
        setCount(repairs[0]);
        setRepairs(repairs[1]);
        setType(type);
      });
    }
    if (type === 'material') {
      setRepairs([]);
      fetchRepairs(codigo, dir, 5).then(repairs => {
        setCount(repairs[0]);
        setRepairs(repairs[1]);
        setType(type);
      });
    }
    if (type === 'closed') {
      setRepairs([]);
      fetchRepairs(codigo, dir, 8).then(repairs => {
        setCount(repairs[0]);
        setRepairs(repairs[1]);
        setType(type);
      });
    }
  };

  const handleRepairsBudget = (id, accept) => {
    const newRepairs = filteredrepairs.map((repair, i) => {
      if (id !== i) return repair;
      const changes = {
        f_respuesta_ppto: moment().format('DD/MM/YY'),
        procesoEstado: '',
      };
      if (accept) {
        changes.procesoEstado = 'ACEPTADO';
        return { ...repair, ...changes };
      }
      changes.procesoEstado = 'RECHAZADO';
      return { ...repair, ...changes };
    });
    console.log(newRepairs);
    setFilteredrepairs(newRepairs);
  };

  useEffect(() => {
    fetchRepairs(codigo, dir, 0).then(repairs => {
      console.log(repairs);
      setCount(repairs[0]);
      setRepairs(repairs[1]);
    });
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

  return (
    <div>
      <SearchBox
        filterInitial={filterInitial}
        searchChange={onSearchChange}
        handleChange={onFilterChange}
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
                id={i}
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
                budgetreject={filteredrepair.rechazado}
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
                handleRepairsBudget={handleRepairsBudget}
              />
            );
          })}
        </Suspense>
      </div>
    </div>
  );
};

export default RepairList;
