
// Components

// import ImageGallery from '@/components/ImageGallery';
import ProductCard from '@/components/AdvertismentAndProductCard';
import Carousel from '@/components/Carousel/carousel';
// Models
import { HomeProps } from '@/models/pages/home';
// import {  Container } from '@mui/material';

const HomePage = (props: HomeProps) => {
  console.log('Home Component', props);

  return (
    <>
      {/* <Box sx={{maxWidth: 500, padding: 5, display: 'block'}}>
        <ImageGallery items={images} />
      </Box> */}
      {/* <FeaturedPosts />*/}
      <LanguageSwitcher /> 
      
      <Carousel >
        {[1,1,1,1,1,1,1,1].map((item: number, index: number) => (

          <ProductCard
            key={item}
            product={{
              isFavorite: false,
              name: 'رسم دراجة نارية لباس علوي تانك',
              price: '42 - ' + index,
              tags: ['قفازات', 'حوامل', 'إضافات'],
              advertisor: {date: '15/03/1995', name: 'محمود عماد'}
            }}
          />
        ))}
      </Carousel>
      {/* dasd */}
      {/* <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <ProductCard
              row
              product={{
                isFavorite: false,
                name: 'رسم دراجة نارية لباس علوي تانك',
                price: 42,
                tags: ['قفازات', 'حوامل', 'إضافات'],
                advertisor: {date: '15/03/1995', name: 'محمود عماد'}
              }}
            />
          </Grid>          
          
          <Grid item xs={12} md={6}>
            <ProductCard
              row
              product={{
                isFavorite: false,
                name: 'رسم دراجة نارية لباس علوي تانك',
                price: 42,
                tags: ['قفازات', 'حوامل', 'إضافات'],
                advertisor: {date: '15/03/1995', name: 'محمود عماد'}
              }}
            />
          </Grid>          
          
          <Grid item xs={12} md={6}>
            <ProductCard
              
              product={{
                isFavorite: false,
                name: 'رسم دراجة نارية لباس علوي تانك',
                price: 42,
                tags: ['قفازات', 'حوامل', 'إضافات'],
                advertisor: {date: '15/03/1995', name: 'محمود عماد'}
              }}
            />
          </Grid>          
          
          <Grid item xs={12} md={6}>
            <ProductCard
              product={{
                isFavorite: false,
                name: 'رسم دراجة نارية لباس علوي تانك',
                price: 42,
                tags: ['قفازات', 'حوامل', 'إضافات'],
                advertisor: {date: '15/03/1995', name: 'محمود عماد'}
              }}
            />
          </Grid>

        </Grid> 
      </Container>*/}
    </>
  );
};

export default HomePage;
