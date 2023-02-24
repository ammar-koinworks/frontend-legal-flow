import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { debounce } from '@mui/material/utils';
import { userSelectMapping } from '../utils/userSelectMapping';

export default function SelectAsyncMultiple({ name, formik, data, defaultValue = [], disabled = false, sx = {}, formName = null, user = false }) {
  const [value, setValue] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);

  const fetch = React.useMemo(
    () =>
      debounce(search => {
        const getData = data(search);

        getData.then((res) => {
          const data = user ? userSelectMapping(res.data) : res?.data?.sort((a, b) => (a.name > b.name) ? 1 : -1);

          setOptions(data);
          return data;
        });
      }, 400)
    , []
  );

  React.useEffect(() => {
    if (inputValue !== '') {
      fetch(inputValue);
    }
  }, [inputValue]);

  React.useEffect(() => {
    setValue(defaultValue);
    const newValueIds = defaultValue ? defaultValue.map((v) => (v.id)) : [];
    formik.setFieldValue(exactName, newValueIds);
  }, []);

  const exactName = `${formName ? formName : name.toLowerCase() + '_id'}`;

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
      multiple
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        const newValueIds = newValue ? newValue.map((v) => (v.id)) : [];
        formik.setFieldValue(exactName, newValueIds);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      disabled={disabled}
      sx={sx}
      renderInput={(params) => (
        <TextField
          {...params}
          label={name}
          error={Boolean(formik.touched[exactName] && formik.errors[exactName])}
          helperText={formik.touched[exactName] && formik.errors[exactName]}
          margin='normal'
          onBlur={formik.handleBlur}
        />
      )}
    />

  );
}
