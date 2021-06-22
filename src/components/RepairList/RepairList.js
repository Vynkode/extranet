import React, { lazy, Suspense, useEffect, useState } from 'react';
import moment from 'moment';
import SearchBox from '../SearchBox/SearchBox';
import Loading from '../Loading/Loading';
import './RepairList.css';

import { fetchRepairs } from '../../utils/repair-fetch';

const RepairPortrait = lazy(() =>
  import('../Repair/RepairPortrait/RepairPortrait')
);
const Repair = lazy(() => import('../Repair/Repair/Repair'));
const Repairfull = lazy(() => import('../Repair/Repairfull/Repairfull'));
const Repairhalf = lazy(() => import('../Repair/Repairhalf/Repairhalf'));

const RepairList = ({ user, width }) => {
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
    if (repairs.length < 1) {
      fetchRepairs(codigo, dir, 0).then(repairs => {
        console.log(repairs);
        setCount(repairs[0]);
        setRepairs(repairs[1]);
      });
    }
  }, []);

  useEffect(() => {
    setFilteredrepairs(repairs);
  }, [repairs]);

  useEffect(() => {
    const results = repairs.filter(repair => {
      if (filteroption === 1) {
        return repair.numero.toString().includes(searchfield);
      } else if (filteroption === 2) {
        return repair.su_referencia?.toString().includes(searchfield);
      } else if (filteroption === 3) {
        if (repair.marca === 'CASIO') {
          return repair.modelo
            .toLowerCase()
            .includes(searchfield.toLowerCase());
        }
        return repair.ref2?.toLowerCase().includes(searchfield.toLowerCase());
      } else if (filteroption === 4) {
        return repair.f_entrada.includes(
          moment(searchfield).format('DD/MM/YY')
        );
      }
    });
    setFilteredrepairs(results);
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
        width={width}
      />
      <div className="container">
        <Suspense fallback={<Loading />}>
          {filteredrepairs.map((filteredrepair, i) => {
            if (width >= 1400) {
              return (
                <Repairfull
                  key={i}
                  id={i}
                  user={user}
                  repair={filteredrepair}
                  handleRepairsBudget={handleRepairsBudget}
                  width={width}
                />
              );
            }
            if (width < 1400 && width >= 860) {
              return (
                <Repairhalf
                  key={i}
                  id={i}
                  user={user}
                  repair={filteredrepair}
                  handleRepairsBudget={handleRepairsBudget}
                  width={width}
                />
              );
            }
            if (width < 860 && width >= 530) {
              return (
                <Repair
                  key={i}
                  id={i}
                  user={user}
                  repair={filteredrepair}
                  handleRepairsBudget={handleRepairsBudget}
                  width={width}
                />
              );
            }
            if (width < 530) {
              return (
                <RepairPortrait
                  key={i}
                  id={i}
                  user={user}
                  repair={filteredrepair}
                  handleRepairsBudget={handleRepairsBudget}
                  width={width}
                />
              );
            }
          })}
        </Suspense>
      </div>
    </div>
  );
};

export default RepairList;
