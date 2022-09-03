import { useEffect } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
// i18n
import nextI18NextConfig from '../next-i18next.config.js';
import { appWithTranslation, useTranslation } from 'next-i18next';
// MUI
import theme from '@/styles/theme';
import createCache from '@emotion/cache';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';

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

  const { Component, pageProps } = props;
  
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
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default appWithTranslation(MyApp, nextI18NextConfig);