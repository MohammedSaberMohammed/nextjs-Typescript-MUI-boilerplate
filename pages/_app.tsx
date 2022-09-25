import { useEffect } from 'react';
// Next
import Head from 'next/head';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
// Styles
import '@/styles/main.scss';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
// i18n
import nextI18NextConfig from '../next-i18next.config.js';
import { appWithTranslation, useTranslation } from 'next-i18next';
// MUI
import theme from '@/styles/theme';
import createCache from '@emotion/cache';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider, EmotionCache } from '@emotion/react';
// Components
import Layout from '@/components/Layout';
import LayoutProvider from '@/context/layout';

// Client-side cache, shared for the whole session of the user in the browser
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
// createEmotionCache
let insertionPoint:any;
const isBrowser = typeof document !== 'undefined';

if (isBrowser) {
  const emotionInsertionPoint = document.querySelector(
    'meta[name="emotion-insertion-point"]',
  );
  insertionPoint = emotionInsertionPoint ?? undefined;
}

const cacheRtl = createCache({
  key: 'mui-style-rtl',
  stylisPlugins: [prefixer, rtlPlugin],
  insertionPoint,
});

const cacheLtr = createCache({
  key: 'mui-style-ltr',
  insertionPoint,
});

function MyApp(props: MyAppProps) {
  const { i18n } = useTranslation();

  const { Component, pageProps: { session, ...pageProps } } = props;
  
  // ! To be revisited
  useEffect(() => {
    // ? Change Layout direction
    document.body.dir = i18n.dir();
  }, [i18n]);
  
  return (
    <CacheProvider value={i18n.dir() === 'rtl' ? cacheRtl : cacheLtr}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      
      <ThemeProvider theme={{...theme, direction: i18n.dir() === 'rtl' ? 'rtl': 'ltr'}}>
        <LayoutProvider>
          <CssBaseline />

          <SessionProvider session={session}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SessionProvider>

        </LayoutProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default appWithTranslation(MyApp, nextI18NextConfig);