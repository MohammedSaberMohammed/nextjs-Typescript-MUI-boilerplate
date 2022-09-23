import Box from '@mui/material/Box';
import { FC, ReactNode } from 'react';
import Footer from './Footer/footer';
import Header from './Header/header';

interface Props {
  children: ReactNode
}

const Layout: FC<Props> = (props) => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main>{props.children}</main>

      <Box sx={{ mt: 'auto' }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
