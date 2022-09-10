
import { FC, useMemo, useState } from 'react';
// Next
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
// MUI
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

// styles
import classes from './styles.module.scss';
import classNames from 'classnames';
import { generateMenus } from './utils';
// Models
import { HeaderMenu, HeaderMenuItem } from '@/models/headerMenu';

const DrawerContent: FC =  () => {
  const theme = useTheme();
  const isInExtraSmallScreens = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation('common');
  const [menusState, setMenusState] = useState<{ [key: string]: boolean}>({
    store: false,
    ads: false,
    sections: false,
    account: false,
  });

  const onMenuClick = (id: string) => {
    setMenusState({...menusState, [id]: !menusState[id]});
  };

  const headerMenus = useMemo(() => generateMenus(t), [t]);

  return (
    <List
      sx={{ minWidth: isInExtraSmallScreens ? '70vw' : '40vw', bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="app-drawer"
      subheader={
        <Link href='/'>
          <a className={classNames(classes.logoWrapper, classes.inDrawer)} >
            <Image src='/icons/logo.svg' width={60} height={60} alt='Bike logo' />
            <Image src='/icons/logo-text.svg' width={60} height={40} alt='Bike logo' />
          </a>
        </Link>
      }
    >
      <ListItemButton>
        <Link href='/products'>
          <ListItemText primary={t('home')} />
        </Link>
      </ListItemButton>

      {Object.values(headerMenus).map((menu: HeaderMenu) => (
        <Box key={menu.id}>
          <ListItemButton onClick={() => onMenuClick(menu.id)}>
            <ListItemText primary={menu.title} />
            {menusState[menu.id] ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={menusState[menu.id]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {menu.items.map((menuItem: HeaderMenuItem) => (
                <ListItemButton key={menuItem.title} sx={{ pl: 4 }}>
                  <Link href={menuItem.link}>
                    <Box sx={{display: 'flex', alignItems: 'center', width: '100%'}}>
                      {menuItem.iconPath && (
                        <ListItemIcon>
                          <Image 
                            src={menuItem.iconPath} 
                            width={23}
                            height={23}
                            alt={`${menuItem.title}-image`}
                          />
                        </ListItemIcon>
                      )}

                      <ListItemText primary={menuItem.title} sx={{ flexGrow: 1 }} />
                    
                      {menuItem.suffix && <Box className={classes.suffix}>{menuItem.suffix}</Box>}
                    </Box>
                  </Link>
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </Box>
      ))}

      <ListItemButton>
        <Link href='/about-us'>
          <ListItemText primary={t('aboutBiker')} />
        </Link>
      </ListItemButton>

      <ListItemButton>
        <Link href='/contact-us'>
          <ListItemText primary={t('contactUs')} />
        </Link>
      </ListItemButton>

    </List>
  );
};

export default DrawerContent;