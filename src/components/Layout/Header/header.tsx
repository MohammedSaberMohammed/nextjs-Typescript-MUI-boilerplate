import { FC, KeyboardEvent, MouseEvent, useEffect, useMemo, useState } from 'react';
// Apis
import { Endpoints } from '@/services/apis';
// Next
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
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
import { generateMenus, loadCategoryMenu } from './utils';
import DrawerContent from './drawerContent';
import { LayoutSettings } from '@/configs/layout';
// styles
import classes from './header.module.scss';
import { HeaderMenu } from '@/models/headerMenu';

const Header: FC = () => {
  const { t } = useTranslation('common');
  const theme = useTheme();
  const isInSmallScreens = useMediaQuery(theme.breakpoints.down('md'));
  const { status, data: profile } = useSession();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [categoriesMenu, setCategoriesMenu] = useState<HeaderMenu>({
    id: 'sections',
    title: t('sections'),
    items: []
  });

  useEffect(() => {
    Endpoints.lookups.categories()
      .then(response => {
        if(response.ok && response.data && response.data.length) {
          setCategoriesMenu(loadCategoryMenu(t, response.data));
        }
      });
  }, []);

  console.log('status, data', status, profile);

  const headerMenus = useMemo(() => generateMenus(t, profile), [t, profile]);

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
        <DrawerContent 
          headerMenus={{
            ...headerMenus,
            sections: categoriesMenu
          }}
        />
      </Drawer>
      
      <AppBar color='inherit' position="static" elevation={0} sx={{mb: '17px'}}>
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
                <BaseMenu data={categoriesMenu} />
            
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