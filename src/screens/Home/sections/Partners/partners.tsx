import { FC } from 'react';
// MUI
import Container from '@mui/material/Container';
// Utils
import { LayoutSettings } from '@/configs/layout';
// Styles
import classes from './partners.module.scss';

const Partners: FC = () => {
  return (
    <section className={classes.wrapper}>
      <Container maxWidth={LayoutSettings.maxWidth}>
        Partners here
      </Container>
    </section>
  );
};

export default Partners;
