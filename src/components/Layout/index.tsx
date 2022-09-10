import { FC, ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header/header';

interface Props {
  children: ReactNode
}

const Layout: FC<Props> = (props) => {
  return (
    <>
      <Header />

      <main>{props.children}</main>

      <Footer />
    </>
  );
};

export default Layout;
