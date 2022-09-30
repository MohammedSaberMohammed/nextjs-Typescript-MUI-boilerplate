import { FC } from 'react';
// Next
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
// MUI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
// Utils
import { LayoutSettings } from '@/configs/layout';
// Styles
import classes from './partners.module.scss';

const Partners: FC = () => {
  const { t } = useTranslation('home');

  return (
    <section className={classes.wrapper}>
      <Container maxWidth={LayoutSettings.maxWidth}>
        Partners here
      </Container>
    </section>
  );
};

export default Partners;
