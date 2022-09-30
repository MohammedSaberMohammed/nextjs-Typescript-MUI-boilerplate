import  { FC, MouseEvent, useMemo, useState } from 'react';
// Next
import Image from 'next/image';
// MUI
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
// styles
import classes from './menu.module.scss';
// Utils
import { useTranslation } from 'next-i18next';
// Models
import { CategoryModel } from '@/models/categories';

interface Props {
  categories: CategoryModel[],
  // eslint-disable-next-line no-unused-vars
  onChange?: (category: CategoryModel) => void
}

const CategoriesMenu: FC<Props> = ({ categories, onChange }) => {
  const { t } = useTranslation('common');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [selectedCategory, setSelectedCategory] = useState<CategoryModel | null>(null);
  
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const onMenuItemClicked = (category: CategoryModel) => {
    // const { props } = category;
    setSelectedCategory(category);
    
    onChange && onChange(category);

    handleClose();
  };

  const selectedCategoryName = useMemo(() => {
    if(selectedCategory) {
      return selectedCategory.title.ar || '';
    }

    return '';
  }, [selectedCategory]);

  const renderEnhancedMenuItem = (category: CategoryModel, key?: number) => (              
    <MenuItem 
      key={key}
      className={classes.menuItem} 
      onClick={() => onMenuItemClicked(category)}
    >

      {category.icon && (
        <Image 
          src={category.icon.medium} 
          width={22}
          height={25}
          alt={`${category.title.en}-image`}
        />
      )}

      <Box sx={{ ml: category.icon ? 2 : 0, flexGrow: 1 }}>{category.title.ar}</Box>
    </MenuItem>
  );

  return (
    <>
      <Button
        id="menu-button"
        // variant={props.variant}
        color='primary'
        disableRipple
        aria-haspopup="true"
        onClick={handleClick}
        className={classes.menuTrigger}
        aria-controls={open ? 'base-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        endIcon={(
          <Image 
            src='/icons/arrow-down.svg' 
            width={20} 
            height={20} 
            alt='menu-arrow' 
          />
        )}
      >
        <Image 
          src='/icons/dots.svg' 
          width={24}
          height={24}
          alt='categories-icon'
        />

        <Box sx={{ ml: 1 }}>
          {selectedCategoryName || t('sections')}
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
        {categories.map((category: CategoryModel, index: number) => renderEnhancedMenuItem(category, index))}
      </Menu>
    </>
  );
};

CategoriesMenu.defaultProps = {
  categories: []
};

export default CategoriesMenu;
