import { ReactNode, useContext } from 'react';
import Slider from 'react-slick';
// Components
// Styles
import classes from './styles.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// Models
import { SlickCarouselProps } from '@/models/slick-carousel';
import { Box, Stack } from '@mui/material';
import { LayoutContext } from '@/context/layout';

interface CarouselProps extends SlickCarouselProps {
  children: ReactNode,
}

const Carousel = (props: CarouselProps) => {
  const {isRTL} = useContext(LayoutContext);

  const settings = {
    customPaging: (i: number) => (
      <div className={classes.dot}>{i + 1}</div>
    )
  };
  console.log(isRTL);
  return (
    <Box sx={{ position: 'relative' }}>
      <Box sx={{ position: 'absolute', right: '-40px' }}>next</Box>

      <Slider
        {...settings}
        {...props}
        rtl={isRTL}
      >
        {props.children}
      </Slider>

      <Box>next</Box>
    </Box>
  );
};

Carousel.defaultProps = {
  dots: true,
  arrows: true,
  infinite: true,
  autoplay: false,

  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

export default Carousel;
