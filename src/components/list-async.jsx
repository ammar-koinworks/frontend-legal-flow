import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ListAsync({ name, data, defaultValue = [] }) {
  const [options, setOptions] = React.useState([]);

  React.useEffect(() => {
    () => {
      const getData = data();
      setOptions(getData.data);
      setDefaultValues(defaultValue.map((item) => item.id));
    }

  }, []);

  return (
    <Autocomplete
      multiple
      id={name}
      options={options.map((map) => map.name)}
      defaultValue={defaultValue.map((map) => map.name)}
      readOnly
      renderInput={(params) => (
        <TextField {...params} label={name} />
      )}
    />
  );
}