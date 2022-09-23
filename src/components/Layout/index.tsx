import { FC, ReactNode, useEffect } from 'react';
// Next
import { useSession } from 'next-auth/react';
// MUI
import Box from '@mui/material/Box';
// Components
import Footer from './Footer/footer';
import Header from './Header/header';
import { DevelopmentEnv } from '@/configs/development';

interface Props {
  children: ReactNode
}

const Layout: FC<Props> = (props) => {
  const {data: session} = useSession();

  useEffect(() => {

    if(process.env.NODE_ENV === 'development') {
      // @ts-ignore
      const userKey = (session && session.user && session.user.token) || '';
      localStorage.setItem(DevelopmentEnv.appToken, userKey);
    }
    console.log('[IN Layout]', session);
    
  }, [session]);

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
