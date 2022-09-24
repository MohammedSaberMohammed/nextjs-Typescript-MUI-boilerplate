import * as React from 'react';
// MUI
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Message = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return (
    <MuiAlert 
      ref={ref} 
      {...props} 
    />
  );
});

Message.defaultProps = {
  elevation: 6,
  variant: 'filled',
  severity: 'info',
};

export default Message;