import { FC, useMemo } from 'react';
import get from 'lodash/get';
// Next
import Image from 'next/image';
// MUI
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// Form
import { FieldProps } from 'formik';
import { useTranslation } from 'next-i18next';
// Models
import { SelectAutocompleteValue } from '@/models/SelectAutocomplete';
// styles
import classes from './formContols.module.scss';

// eslint-disable-next-line no-unused-vars
type onChangeType = (name: string, value: SelectAutocompleteValue) => void;
interface Props {
  name: string;
  label?: string;
  labelTargetKey?: string;
  multiple?: boolean;
  fancySelect?: boolean;
  disableClearable?: boolean;
  value: string | number | string[] | number[] | null;
  onChange: onChangeType;
  lookup: any[];
  fieldProps?: FieldProps,
}

const SelectAutocomplete: FC<Props> = ({ 
  name,
  value,
  label, 
  lookup, 
  multiple, 
  onChange, 
  fieldProps,
  fancySelect,
  labelTargetKey,
  ...props
}) => {
  const { t } = useTranslation('common');
  
  const handleChange = (value: any) => {
    let exportedValue;

    if(multiple) {
      exportedValue = (Array.isArray(value) && value.length) ? value.map((option) => option.id) : [] as string[];
    } else {
      exportedValue = value ? value.id : null;
    }

    onChange(name, exportedValue);  
  };
  
  const enhancedValue = useMemo(() => {

    if(multiple) {
      const isValidValue = value && Array.isArray(value);
      return isValidValue ? lookup.filter((item: any) => (value as (string | number)[]).some((val: number | string) => val == item.id)) : [];
    }

    return lookup.find((item: any) => item.id == value) || null;
  }, [props, lookup]);

  const configs = useMemo(() => {
    const initialConfigs: any = {
      ...(fieldProps?.field || {}),
      ...props,
      name,
      label,
    };

    if(fieldProps) {
      const { meta: { error, touched } } = fieldProps;

      if(touched && error) {
        initialConfigs.helperText = error;
        initialConfigs.error = true;
      }
    }

    return initialConfigs;
  }, [fieldProps, props, label, name]);

  const conditionalProps = useMemo(() => {
    const additionalProps: any = {};

    if(fancySelect && multiple) {
      additionalProps.filterSelectedOptions = true;
      additionalProps.renderTags = () => {};
    }

    return additionalProps;
  }, [fancySelect]);

  const onDeleteOption = (option: any) => {
    const filteredOptions = (value as (string | number)[]).filter((selectedOption: number | string) => option.id !== selectedOption);

    onChange(name, filteredOptions); 
  };

  return (
    <>
      <Autocomplete
        {...props}
        {...conditionalProps}
        fullWidth
        getOptionLabel={(option: any) => get(option, labelTargetKey || 'label')}
        isOptionEqualToValue={(option: any, value: any) => option.id === value.id}
        options={lookup}
        value={enhancedValue}
        multiple={multiple}
        filterSelectedOptions
        noOptionsText={t('noData')}
        onChange={(...rest) => handleChange(rest[1] as any)}
        renderInput={(params) => (
          <TextField 
            {...params} 
            {...configs} 
          />
        )}
      />

      {fancySelect && multiple && enhancedValue && (
        <div className={classes.fancyOptionsWrapper}>
          {(enhancedValue as any[]).map((option: any) => (
            <Box key={option.id} className={classes.fancyOption}>
              <div className={classes.overlay} onClick={() => onDeleteOption(option)}>
                <Image 
                  src={'/icons/trash.svg'} 
                  width={20}
                  height={20}
                  alt=''
                />
              </div>
              {get(option, labelTargetKey || 'label')}
            </Box>
          ))}
        </div>
      )}

    </>
  );
};

SelectAutocomplete.defaultProps = {
  labelTargetKey: 'label',

  fancySelect: false,
  multiple: false,

  lookup: [],
};

export default SelectAutocomplete;
