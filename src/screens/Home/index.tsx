import ImageGallery from '@/components/ImageGallery';
import LanguageSwitcher from '@/components/languageSwitcher';
import ProductCard from '@/components/ProductCard';
import { Box, Container, Grid } from '@mui/material';
// import FeaturedPosts from './FeaturedPosts';
// import Hero from './Hero';

const HomePage = () => {
  const images = [
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
      thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },{
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
  ];

  return (
    <>
      {/* <Box sx={{maxWidth: 500, padding: 5, display: 'block'}}>
        <ImageGallery items={images} />
      </Box> */}
      {/* <FeaturedPosts />
      <LanguageSwitcher /> */}

      <Container >
        <Grid container spacing={2}>
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
      </Container>
    </>
  );
};

export default HomePage;
