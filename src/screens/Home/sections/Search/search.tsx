import { ChangeEvent, FC, useState } from 'react';
// Next
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
// Mui
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
// Components
import CategoriesMenu from './menu/menu';
// Models
import { CategoryModel } from '@/models/categories';
// Utils
import { LayoutSettings } from '@/configs/layout';
// Styles
import classes from './search.module.scss';
import { InputAdornment } from '@mui/material';

interface Props {
  categories: CategoryModel[]
}

const Search: FC<Props> = ({ categories }) => {
  const { t } = useTranslation('home');
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryModel | null>(null);

  const onChangeSearchText = (e: ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value);

  const onSearch = () => {
    // Todo: search Functionality
    console.log(searchText, selectedCategory);
  };

  return (
    <section>
      <Container className={classes.wrapper} maxWidth={LayoutSettings.maxWidth}>
        <div className={classes.searchWrapper}>
          <CategoriesMenu categories={categories} onChange={setSelectedCategory} />

          <TextField 
            variant='standard'
            value={searchText}
            onChange={onChangeSearchText}
            className={classes.searchField}
            placeholder={t('platformSearch')}
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <Image
                    src='/icons/search.svg' 
                    width={24}
                    height={24}
                    alt='search'
                  />
                </InputAdornment>
              ),            
              endAdornment: (
                <InputAdornment sx={{ cursor: 'pointer' }} position="start">
                  {searchText && (
                    <Button 
                      fullWidth
                      sx={{ fontWeight: 'bold', fontSize: '16px', padding: 0, minWidth: 'auto' }}
                      color='primary'
                      onClick={onSearch}
                    >
                      {t('search')}
                    </Button>
                  )}
                </InputAdornment>
              ),
            }}
          />
        </div>
      
        <div className={classes.advertiseLink}>
          <Link href='/advertise' passHref>
            <Button 
              fullWidth
              variant="contained"
              color='primary'
              className={classes.addBtn} 
              startIcon={(
                <Image 
                  src='/icons/add.svg' 
                  width={26} 
                  height={26} 
                  alt='create an advertisment' 
                />
              )}
            >
              {t('addAdvertisment')}
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default Search;
