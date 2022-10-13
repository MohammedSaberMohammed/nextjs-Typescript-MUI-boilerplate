import { FC, MouseEvent, useMemo, useState } from 'react';
// Next
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
// MUI
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// Styles
import classes from './menu.module.scss';

const ActionsMenu: FC = () => {
  const { t } = useTranslation('common');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onEdit = () => {
    console.log('onEdit Clicked');
    handleClose();
  };  
  
  const onDelete = () => {
    console.log('onDelete Clicked');
    handleClose();
  };

  const options = useMemo(() => [
    {
      iconPath: '/icons/edit.svg',
      title: t('edit'),
      onClick: onEdit
    },    
    {
      iconPath: '/icons/delete.svg',
      title: t('delete'),
      onClick: onDelete
    },
  ], [t]);

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        id="long-menu"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        MenuListProps={{
          className: classes.menu,
          'aria-labelledby': 'long-button',
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        {options.map(({ iconPath, title, onClick }, index) => (
          <MenuItem 
            key={index}
            className={classes.menuItem} 
            onClick={onClick}
          >

            {iconPath && (
              <Image 
                src={iconPath} 
                width={22}
                height={25}
                alt={`${title}-image`}
              />
            )}

            <Box sx={{ ml: iconPath ? 2 : 0, flexGrow: 1 }}>{title}</Box>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default ActionsMenu;