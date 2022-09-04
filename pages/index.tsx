import type { NextPage } from 'next';
import Head from 'next/head';
// Components
import HomePage from '@/screens/Home';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name='description' content='Home is redy' />
      </Head>

      <HomePage />
    </>
  );
};

export default Home;
