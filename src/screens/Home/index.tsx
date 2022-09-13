// import ImageGallery from '@/components/ImageGallery';
import LanguageSwitcher from '@/components/languageSwitcher';
import ProductCard from '@/components/ProductCard';
import Carousel from '@/components/Carousel/carousel';
import {  Container, Grid } from '@mui/material';
// import FeaturedPosts from './FeaturedPosts';
// import Hero from './Hero';

const HomePage = () => {
  // const images = [
  //   {
  //     original: 'https://picsum.photos/id/1018/1000/600/',
  //     thumbnail: 'https://picsum.photos/id/1018/250/150/',
  //   },
  //   {
  //     original: 'https://picsum.photos/id/1015/1000/600/',
  //     thumbnail: 'https://picsum.photos/id/1015/250/150/',
  //   },
  //   {
  //     original: 'https://picsum.photos/id/1019/1000/600/',
  //     thumbnail: 'https://picsum.photos/id/1019/250/150/',
  //   },{
  //     original: 'https://picsum.photos/id/1015/1000/600/',
  //     thumbnail: 'https://picsum.photos/id/1015/250/150/',
  //   },
  //   {
  //     original: 'https://picsum.photos/id/1019/1000/600/',
  //     thumbnail: 'https://picsum.photos/id/1019/250/150/',
  //   },
  // ];

  return (
    <>
      {/* <Box sx={{maxWidth: 500, padding: 5, display: 'block'}}>
        <ImageGallery items={images} />
      </Box> */}
      {/* <FeaturedPosts />*/}
      <LanguageSwitcher /> 

      <Container maxWidth={'xl'} sx={{ py: 5 }}>
        <Carousel>
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

        </Grid> */}
      </Container>
    </>
  );
};

export default HomePage;
