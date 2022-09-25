import { FC } from 'react';
// Mui
// import Container from '@mui/material/Container';
// Models
import { CategoryModel } from '@/models/categories';
// Styles
import classes from './styles.module.scss';

interface Props {
  categories: CategoryModel[]
}

const Search: FC<Props> = (props) => {
  console.log('Search', props);

  return (
    <section>
      Search here
    </section>
  );
};

export default Search;
