import { FC, KeyboardEvent, MouseEvent, useMemo, useState } from 'react';
// Next
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
// MUI
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
// components
import BaseMenu from '@/components/BaseMenu/baseMenu';
// Utils
import { generateMenus } from './utils';
import DrawerContent from './drawerContent';
import { LayoutSettings } from '@/configs/layout';
// styles
import classes from './styles.module.scss';

const Header: FC = () => {
  const theme = useTheme();
  const isInSmallScreens = useMediaQuery(theme.breakpoints.down('md'));
  const { t } = useTranslation('common');

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const headerMenus = useMemo(() => generateMenus(t), [t]);

  const toggleDrawer = (open: boolean) =>
    (event: KeyboardEvent | MouseEvent) => {
      if (
        event.type === 'keydown' &&
      ((event as KeyboardEvent).key === 'Tab' ||
        (event as KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setIsDrawerOpen(open);
    };
  
  return (
    <>
      <Drawer
        anchor='left'
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
      >
        <DrawerContent />
      </Drawer>
      
      <AppBar color='inherit' position="static" elevation={0}>
        <Container maxWidth={LayoutSettings.maxWidth}>
          <Toolbar disableGutters sx={{  display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Logo */}
            <Link href='/'>
              <a className={classes.logoWrapper}>
              
                {!isInSmallScreens && <Image src='/icons/logo.svg' width={80} height={70} alt='Bike logo' />}
                <Image src='/icons/logo-text.svg' width={80} height={30} alt='Bike logo' />
              </a>
            </Link>

            {!isInSmallScreens && (
              <Stack direction="row" spacing={2}>
                <BaseMenu data={headerMenus.storeMenu} />
                <BaseMenu data={headerMenus.adsMenu} />
                <BaseMenu data={headerMenus.sectionsMenu} />
            
                <Link href='/about-us'>
                  <a className={classes.link}>{t('aboutBiker')}</a>
                </Link>

                <Link href='/contact-us'>
                  <a className={classes.link}>{t('contactUs')}</a>
                </Link>
              </Stack>
            )}

            {isInSmallScreens ? (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="drawer"
                onClick={toggleDrawer(true)}
                sx={{ px: 0 }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Stack direction="row" spacing={2}>
                <Link href='/notifications'>
                  <a>
                    <Box className={classes.notificationWrapper} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Image src='/icons/notifications.svg' width={25} height={25} alt='Notifications' />
                    </Box>
                  </a>
                </Link>            
          
                <Link href='/basket'>
                  <a>
                    <Box className={classes.basketWrapper} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Image src='/icons/basket.svg' width={25} height={25} alt='Notifications' />
                    </Box>
                  </a>
                </Link>

                <BaseMenu data={headerMenus.account} isPrimary variant='outlined'/>
              </Stack>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;