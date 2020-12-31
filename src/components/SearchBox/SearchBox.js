import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './SearchBox.css';

const useStyles = makeStyles((theme) => ({
  formControl: {
    color: 'white',
    minWidth: 130,
  },
  inputLabel: {
    color: 'lightgray',
    '&.Mui-focused': {
      color: 'rgba(159, 48, 48, 0.9)',
    },
  },
  List: {
    color: 'white',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SearchBox = ({ filterInitial, searchChange, handleChange }) => {
  const classes = useStyles();
  const [filtro, setFiltro] = React.useState(1);

  const handleSelect = (event) => {
    filterInitial('');
    document.getElementsByClassName('searchbox')[0].value = '';
    setFiltro(event.target.value);
    console.log(filtro);
    handleChange(event);
  };

  // console.log('Render: Searchbox');

  return (
    <div className='searchbar'>
      <FormControl variant='outlined' className={classes.formControl}>
        <InputLabel id='searchBoxFilter' className={classes.inputLabel}>
          Filtro
        </InputLabel>
        <Select labelId='searchBoxFilter' id='demo-simple-select-outlined' value={filtro} onChange={handleSelect} label='Age'>
          <MenuItem value={1}>Reparación</MenuItem>
          <MenuItem value={2}>Referencia</MenuItem>
          <MenuItem value={3}>Modelo</MenuItem>
          <MenuItem value={4}>Fecha</MenuItem>
        </Select>
      </FormControl>
      {filtro === 4 ? (
        <input className='searchbox' type='date' placeholder='Busqueda' onChange={searchChange} />
      ) : (
        <input className='searchbox' type='search' placeholder='Busqueda' onChange={searchChange} />
      )}
      {/* {type === 'workshop' ? <a onClick={handleType('workshop')}>Entregadas</a> : <a onClick={handleType('closed')}>Taller</a>} */}
    </div>
  );
};

export default SearchBox;
