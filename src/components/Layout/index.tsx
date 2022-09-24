import { FC, ReactNode, useEffect } from 'react';
// Next
import { useSession } from 'next-auth/react';
// Notifications
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

    if(session &&process.env.NODE_ENV === 'development') {
      // @ts-ignore
      const userKey = (session && session.user && session.user.token) || '';

      localStorage.setItem(DevelopmentEnv.appToken, userKey);
    }
    
  }, [session]);

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ToastContainer 
        rtl
        draggable
        newestOnTop
        closeOnClick
        pauseOnHover 
        pauseOnFocusLoss
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
      />
      <Header />

      <main>{props.children}</main>

      <Box sx={{ mt: 'auto' }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
