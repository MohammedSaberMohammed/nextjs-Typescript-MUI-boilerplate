import { ChangeEvent, FC } from 'react';
// Next
import Image from 'next/image';
// MUI
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import IconButton from '@mui/material/IconButton';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
// Models
import { BaseLookupOptionModel } from '@/models/lookups';
// Styles
import classes from './formContols.module.scss';

interface Props {
  label?: string,
  name?: string,
  value: string | number,
  lookup: BaseLookupOptionModel[],
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string | number, name?: string) => void
}

const StaticLookupRadio: FC<Props> = ({ 
  name,
  label,
  value,
  lookup,
  onChange
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedValue = (event.target as HTMLInputElement).value;
    
    onChange(selectedValue, name);
  };

  const onResetValue = () => {
    onChange('', name);
  };

  return (
    <FormControl className={classes.staticLookupRadioWrapper}>
      <Box display='flex' alignItems='center' justifyContent='space-between' className={classes.labelWrapper}>
        <FormLabel
          className={classes.label}
          id="static-lookup-radio"
        >
          {label}
        </FormLabel>
      
        {value && (
          <IconButton onClick={onResetValue}>
            <Image 
              src='/icons/refresh.svg' 
              width={24}
              height={24}  
              alt='reset icon'
            />
          </IconButton>
        )}
      </Box>

      <RadioGroup
        aria-labelledby="static-lookup-radio"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        {lookup.map((option: BaseLookupOptionModel) => (
          <FormControlLabel 
            key={option.id}
            value={option.id} 
            control={<Radio />} 
            label={option.label} 
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

StaticLookupRadio.defaultProps = {
  label: '',
  name: '',

  lookup: [],
  onChange() {}
};

export {
  StaticLookupRadio
};
