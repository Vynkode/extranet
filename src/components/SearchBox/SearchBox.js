import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './SearchBox.css';

const useStyles = makeStyles(theme => ({
  formControl: {
    color: 'rgba(255,255,255,0.8)',
    minWidth: 130,
  },
  inputLabel: {
    color: 'rgba(255,255,255,0.8)',
    '&.Mui-focused': {
      color: 'rgba(159, 48, 48, 0.9)',
    },
  },
  List: {
    color: 'rgba(255,255,255,0.8)',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  menuItem: {
    color: 'rgba(255,255,255,0.8)',
  },
}));

const SearchBox = ({
  filterInitial,
  searchChange,
  handleChange,
  handleType,
  type,
  count,
  width,
}) => {
  const classes = useStyles();
  const [filtro, setFiltro] = React.useState(1);

  const handleSelect = event => {
    filterInitial('');
    document.getElementsByClassName('searchbox')[0].value = '';
    setFiltro(event.target.value);
    console.log(filtro);
    handleChange(event);
  };

  return (
    <div className="searchbar">
      <div className="search-container">
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="searchBoxFilter" className={classes.inputLabel}>
            Filtro
          </InputLabel>
          <Select
            labelId="searchBoxFilter"
            id="demo-simple-select-outlined"
            value={filtro}
            onChange={handleSelect}
            label="Age"
          >
            <MenuItem value={1}>Reparación</MenuItem>
            <MenuItem value={2}>Referencia</MenuItem>
            <MenuItem value={3}>Modelo</MenuItem>
            <MenuItem value={4}>Fecha</MenuItem>
          </Select>
        </FormControl>
        {filtro === 4 ? (
          <input
            className="searchbox"
            type="date"
            placeholder="Busqueda"
            onChange={searchChange}
          />
        ) : (
          <input
            className="searchbox"
            type="search"
            placeholder="Busqueda"
            onChange={searchChange}
          />
        )}
      </div>
      <div className="type-container">
        <div className="type">
          <FontAwesomeIcon
            onClick={() => handleType(type)}
            icon="sync-alt"
            className="refresh-icon"
          />
          <button
            className={type === 'workshop' ? 'selected' : ''}
            onClick={() => {
              handleType('workshop');
            }}
          >
            <FontAwesomeIcon className="type-icon" icon="tools" />
            {`${
              width > 1100
                ? `Taller ${type === 'workshop' ? ` (${count})` : ''}`
                : ''
            } `}
          </button>
          <button
            className={type === 'budget' ? 'selected' : ''}
            onClick={() => {
              handleType('budget');
            }}
          >
            <FontAwesomeIcon className="type-icon" icon="receipt" />

            {width > 1100
              ? `Presupuesto ${type === 'budget' ? ` (${count})` : ''}`
              : ''}
          </button>
          <button
            className={type === 'material' ? 'selected' : ''}
            onClick={() => {
              handleType('material');
            }}
          >
            <FontAwesomeIcon className="type-icon" icon="business-time" />{' '}
            {width > 1100
              ? `Pdte Material ${type === 'material' ? ` (${count})` : ''}`
              : ''}
          </button>
          <button
            className={type === 'closed' ? 'selected' : ''}
            onClick={() => {
              handleType('closed');
            }}
          >
            <FontAwesomeIcon className="type-icon" icon="check" />
            {width > 1100
              ? `Entregadas ${type === 'closed' ? ` (${count})` : ''}`
              : ''}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
