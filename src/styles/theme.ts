import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: '#b28e4d',
    },
    secondary: {
      main: '#4d3c1c',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;