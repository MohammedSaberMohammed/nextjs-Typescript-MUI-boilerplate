import { FC, ReactNode } from 'react';
// Next
import Image from 'next/image';
// MUI
import Box from '@mui/material/Box';
import { useTheme, useMediaQuery } from '@mui/material';
// Styles
import classes from './styles.module.scss';
import classNames from 'classnames';

interface Props {
  children: ReactNode
}

const AnonymousWizard: FC<Props> = (props) => {
  const theme = useTheme();
  const isInSmallScreens = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box className={classes.wizard}>
      {!isInSmallScreens && (
        <Box className={classes.logoWrapper}>
          <Image
            src='/icons/logo-with-text.svg' 
            width={170}
            height={110}
            alt='logo-placeholder'
          />
        </Box>
      )}

      <Box className={classNames(classes.contentWrapper, { [classes.fullWidth]: isInSmallScreens })}>
        {props.children}
      </Box>
    </Box>
  );
};

export default AnonymousWizard;
