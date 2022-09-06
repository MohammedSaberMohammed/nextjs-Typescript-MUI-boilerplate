import { FC, useMemo } from 'react';
// MUI
import TextField, { BaseTextFieldProps } from '@mui/material/TextField';

import { useField } from 'formik';

interface Props extends BaseTextFieldProps {
  name: string;
}

const Text: FC<Props> = (props) => {
  const [field, meta] = useField(props.name);

  const configs = useMemo(() => {
    const initialConfigs = {
      ...field,
      ...props,
    };

    if(meta && meta.touched && meta.error) {
      initialConfigs.helperText = meta.error;
      initialConfigs.error = true;
    }

    return initialConfigs;
  }, [field, props, meta]);

  return <TextField {...configs} />;
};

Text.defaultProps = {
  fullWidth: true,
  variant: 'outlined'
};

export default Text;
