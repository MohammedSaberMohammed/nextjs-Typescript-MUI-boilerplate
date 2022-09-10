import  { FC, MouseEvent, useState } from 'react';
// Next
import Link from 'next/link';
import Image from 'next/image';
// MUI
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button, { ButtonProps } from '@mui/material/Button';
// Models
import { HeaderMenu, HeaderMenuItem } from '@/models/headerMenu';
// styles
import classes from './styles.module.scss';
import classNames from 'classnames';

interface Props extends ButtonProps {
  data: HeaderMenu,
  linkClass?: string,
  isPrimary?: boolean
}

const BaseMenu: FC<Props> = (props) => {
  const { data } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Button
        id="menu-button"
        variant={props.variant}
        aria-haspopup="true"
        onClick={handleClick}
        className={classNames(classes.menuTrigger, {[classes.primary]: props.isPrimary})}
        aria-controls={open ? 'base-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        endIcon={<Image src='/icons/arrow-down.svg' width={19} height={19} alt='menu-arrow' />}
      >
        {data.iconPath && (
          <Image 
            src={data.iconPath} 
            width={23}
            height={23}
            alt={`${data.id}-image`}
          />
        )}

        <Box sx={{ ml: 1 }}>
          {data?.title}
        </Box>
      </Button>

      <Menu
        id="base-menu"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        MenuListProps={{
          className: classes.menu,
          'aria-labelledby': 'menu-button',
        }}
      >
        {data.items.map((item: HeaderMenuItem, index: number) => (
          <Link href={item.link} passHref key={index}>
            <a className={classes.menuLink}>
              <MenuItem className={classes.menuItem} onClick={handleClose}>

                {item.iconPath && (
                  <Image 
                    src={item.iconPath} 
                    width={23}
                    height={23}
                    alt={`${item.title}-image`}
                  />
                )}

                <Box sx={{ ml: item.iconPath ? 2 : 0, flexGrow: 1 }}>{item.title}</Box>

                {item.suffix && <Box className={classes.suffix}>{item.suffix}</Box>}
              </MenuItem>
            </a>
          </Link>
        ))}
      </Menu>
    </>
  );
};

BaseMenu.defaultProps = {
  variant: 'text',
  isPrimary: false
};

export default BaseMenu;