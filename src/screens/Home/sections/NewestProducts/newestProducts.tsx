import { FC } from 'react';
// MUI
import Container from '@mui/material/Container';

// Components
// import ImageGallery from '@/components/ImageGallery';
import AdvertismentAndProductCard from '@/components/AdvertismentAndProductCard';
import Carousel from '@/components/Carousel/carousel';

// Mui
// import Container from '@mui/material/Container';
// Models
import { AdsAndProductsModel } from '@/models/adsAndProducts';
// Styles
import classes from './newestProducts.module.scss';
import { LayoutSettings } from '@/configs/layout';

interface Props {
  products: AdsAndProductsModel[]
}

const NewestProducts: FC<Props>  = ({ products }) => {
  console.log('NewestProducts', products);

  return (
    <section className={classes.wrapper}>
      <Container maxWidth={LayoutSettings.maxWidth}>
        <h3>Titld</h3>
        <Carousel >
          {products.map((product: AdsAndProductsModel) => (
            <AdvertismentAndProductCard
              key={product.id}
              product={product}
            />
          ))}
        </Carousel>
      </Container>
    </section>
  );
};

export default NewestProducts;
