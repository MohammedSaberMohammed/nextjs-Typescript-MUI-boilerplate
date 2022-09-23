import { FC, useMemo, useState } from 'react';
// Next
import Image from 'next/image';
// MUI
import TextField, { BaseTextFieldProps } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
// Form
import { useField } from 'formik';

interface Props extends BaseTextFieldProps {
  name: string;
}

const Text: FC<Props> = (props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [field, meta] = useField(props.name);

  const isPasswordField = useMemo(() => props.type === 'password', [props.type]);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const inputProps = useMemo(() => ({
    endAdornment: isPasswordField ? (
      <InputAdornment 
        position="end" 
        sx={{ cursor: 'pointer' }}
        onClick={togglePasswordVisibility}
      >
        <Image
          src={`/icons/${showPassword ? 'hidden-password' : 'visible-password'}.svg`} 
          width={24}
          height={24}
          alt='toggle password'
        />
      </InputAdornment>
    ) : null
  }), [showPassword, isPasswordField]);

  const inputType = useMemo(() => {
    if(isPasswordField) {
      return showPassword ? 'text' : 'password';
    }

    return 'text';
  }, [isPasswordField, showPassword]);

  const configs = useMemo(() => {
    const initialConfigs = {
      ...field,
      InputProps: inputProps,
      ...props,
      type: inputType
    };

    if(meta && meta.touched && meta.error) {
      initialConfigs.helperText = meta.error;
      initialConfigs.error = true;
    }

    return initialConfigs;
  }, [field, props, meta]);

  return (
    <TextField 
      {...configs} 
    />
  );
};

Text.defaultProps = {
  fullWidth: true,
  variant: 'outlined'
};

export default Text;
