import { FC, useMemo } from 'react';
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
import { LookupOption } from '@/models/formControls';
import { SelectAutocompleteValue } from '@/models/SelectAutocomplete';
// styles
import classes from './formContols.module.scss';

// eslint-disable-next-line no-unused-vars
type onChangeType = (name: string, value: SelectAutocompleteValue) => void;
interface Props {
  name: string;
  label?: string;
  multiple?: boolean;
  fancySelect?: boolean;
  disableClearable?: boolean;
  value: string | number | string[] | number[];
  onChange: onChangeType;
  lookup: LookupOption[];
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
  ...props
}) => {
  const { t } = useTranslation('common');
  
  const handleChange = (value: LookupOption | LookupOption[] | null) => {
    let exportedValue;

    if(multiple) {
      exportedValue = (Array.isArray(value) && value.length) ? value.map((option: LookupOption) => option.id) : [] as string[];
    } else {
      exportedValue = value ? (value as LookupOption).id : null;
    }

    onChange(name, exportedValue);  
  };
  
  const enhancedValue = useMemo(() => {
    if(multiple) {
      return lookup.filter((item: LookupOption) => (value as (string | number)[]).some((val: number | string) => val === item.id));
    }

    return lookup.find((item: LookupOption) => item.id === value) || null;
  }, [props, lookup]);

  const configs = useMemo(() => {
    const initialConfigs: any = {
      ...(fieldProps?.field || {}),
      ...props,
      name,
      label,
    };

    if(fieldProps) {
      const { meta: { error } } = fieldProps;

      // if(touched && error) {
      if(error) {
        initialConfigs.helperText = error;
        initialConfigs.error = true;
      }
    }

    return initialConfigs;
  }, [fieldProps, props, label, name]);

  const conditionalProps = useMemo(() => {
    const additionalProps: any = {};

    if(fancySelect && multiple) {
      additionalProps.filterSelectedOptions = fancySelect;
      additionalProps.renderTags = () => {};
    }

    return additionalProps;
  }, [fancySelect]);

  const onDeleteOption = (option: LookupOption) => {
    const filteredOptions = (value as (string | number)[]).filter((selectedOption: number | string) => option.id !== selectedOption);

    onChange(name = '', filteredOptions); 
  };

  return (
    <>
      <Autocomplete
        {...props}
        {...conditionalProps}
        fullWidth
        options={lookup}
        value={enhancedValue}
        multiple={multiple}
        noOptionsText={t('noData')}
        onChange={(...rest) => handleChange(rest[1] as LookupOption | LookupOption[])}
        renderInput={(params) => (
          <TextField 
            {...params} 
            {...configs} 
          />
        )}
      />

      {fancySelect && multiple && enhancedValue && (
        <div className={classes.fancyOptionsWrapper}>
          {(enhancedValue as LookupOption[]).map((option: LookupOption) => (
            <Box key={option.id} className={classes.fancyOption}>
              <div className={classes.overlay} onClick={() => onDeleteOption(option)}>
                <Image 
                  src={'/icons/trash.svg'} 
                  width={20}
                  height={20}
                  alt=''
                />
              </div>
              {option.label}
            </Box>
          ))}
        </div>
      )}

    </>
  );
};

SelectAutocomplete.defaultProps = {
  fancySelect: false,
  multiple: false
};

export default SelectAutocomplete;
