import { ChangeEvent, FC, ReactNode } from 'react';
// Form
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';

type Color = 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'default';

interface Props {
  name: string;
  color?: Color;
  label?: ReactNode;
  helperText?: string;
  error?: boolean;
  checked?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange: (name: string, value: boolean) => void
}

const CheckboxField: FC<Props> = ({
  name,
  color,
  error,
  helperText,
  label,
  checked,
  onChange
}) => {

  const onCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;

    onChange(name, checked);
  };

  return (
    <FormControl error={error}>
      <FormControlLabel
        label={label}
        control={
          <Checkbox
            name={name}
            color={color}
            checked={checked}
            onChange={onCheck}
            inputProps={{
              'aria-label': 'terms And condition agreement',
            }}
          />
        }
      />

      {helperText && (<FormHelperText>{helperText}</FormHelperText>)}
    </FormControl>
  );
};

CheckboxField.defaultProps = {
  color: 'secondary',
  label: '',
  helperText: '',
  checked: false,
  error: false
};

export default CheckboxField;
