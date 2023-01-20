import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { debounce } from '@mui/material/utils';

export default function SelectAsync({ name, formik, data, defaultValue = { id: null, name: null } }) {
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);

  const fetch = React.useMemo(
    () =>
      debounce(search => {
        const getData = data(search);

        getData.then((res) => {
          const data = res?.data?.sort((a, b) => (a.name > b.name) ? 1 : -1)

          setOptions(data);
          return data;
        });
      }, 400)
    , []
  );

  React.useEffect(() => {
    if (inputValue !== '' && inputValue !== defaultValue.name) {
      fetch(inputValue);
    }
  }, [inputValue]);

  React.useEffect(() => {
    if (defaultValue.id) {
      setOptions([defaultValue])
      setValue(defaultValue)
    }
  }, [defaultValue.id]);

  return (
    <Autocomplete
      id={name}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.name
      }
      isOptionEqualToValue={(option, value) => option.name === value.name}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        setInputValue('');
        formik.setFieldValue(name.toLowerCase(), newValue ? newValue.id : null);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={name}
          error={Boolean(formik.touched[name.toLowerCase()] && formik.errors[name.toLowerCase()])}
          helperText={formik.touched[name.toLowerCase()] && formik.errors[name.toLowerCase()]}
          margin='normal'
        />
      )}
      onBlur={formik.handleBlur}
    />
  );
}