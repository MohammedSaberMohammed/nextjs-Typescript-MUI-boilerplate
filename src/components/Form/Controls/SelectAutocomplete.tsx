import { useMemo } from 'react';
// MUI
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// Form
// import { FieldProps } from 'formik';
import { useTranslation } from 'next-i18next';
// Models
import { LookupOption } from '@/models/formControls';

// ! To be revisited
// interface Props {
//   name: string;
//   label: string;
//   lookup: LookupOption[],
//   fieldProps?: FieldProps
// }

function SelectAutocomplete({ fieldProps, name, label, lookup, ...props}: any) {
  const { t } = useTranslation('common');

  const handleChange = (value: any) => {
    const { onChange, multiple } = props;

    let exportedValue;

    if(multiple) {
      exportedValue =  value.length ? value.map((option: LookupOption) => option.id) : value;
    } else {
      exportedValue = value ? value.id : '';
    }

    onChange(name, exportedValue);
  };
  
  const enhancedValue = useMemo(() => {
    const {value, multiple} = props;

    if(multiple) {
      return lookup.filter((item: LookupOption) => value.some((val: number | string) => val === item.id));
    }

    return lookup.find((item: LookupOption) => item.id === value) || null;
  }, [props, lookup]);

  const configs = useMemo(() => {
    
    const initialConfigs: any = {
      ...(fieldProps?.filed || {}),
      ...props,
      name,
      label,
    };

    if(fieldProps) {
      const { meta: { touched, error } } = fieldProps;
      if(touched && error) {
        initialConfigs.helperText = error;
        initialConfigs.error = true;
      }
    }

    return initialConfigs;
  }, [fieldProps, props, label, name]);

  return (
    <Autocomplete
      {...props}
      value={enhancedValue}
      options={lookup}
      noOptionsText={t('noData')}
      // onChange={handleChange}
      onChange={(...rest) => handleChange(rest[1])}
      renderInput={(params) => (
        <TextField 
          {...params} 
          {...configs} 
        />
      )}
    />
  );
};

SelectAutocomplete.defaultProps = {

};

export default SelectAutocomplete;
