import { ReactNode, useContext, useRef } from 'react';
import Slider, { Settings } from 'react-slick';
// MUi
import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForward from '@mui/icons-material/ArrowForwardIosOutlined';
// Components
// Styles
import classes from './carousel.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// Models
import { LayoutContext } from '@/context/layout';

interface CarouselProps extends Settings {
  children: ReactNode;
  showCustomPaging?: boolean
}

const Carousel = (props: CarouselProps) => {
  const carouselRef = useRef<typeof Slider | null>(null);
  const {isRTL} = useContext(LayoutContext);
  const isBelowExtraLarge = useMediaQuery('(max-width: 1592px)');

  const settings = {
    customPaging: (i: number) => (
      <div className={classes.dot}>{i + 1}</div>
    )
  };

  const slickNext = () => {
    if(carouselRef.current) {
      (carouselRef.current as typeof Slider & { slickNext: () => void }).slickNext();
    }
  };

  const slickPrev = () => {
    if(carouselRef.current) {
      (carouselRef.current as typeof Slider & { slickPrev: () => void }).slickPrev();
    }
  };

  return (
    <>
      {isBelowExtraLarge && props.showCustomPaging && (
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
          <Box className={classes.action} onClick={isRTL ? slickNext : slickPrev}>
            {isRTL ? <ArrowForward color='secondary' /> : <ArrowBack color='secondary' />}
          </Box>

          <Box className={classes.action} mx={2} onClick={isRTL ? slickPrev : slickNext}>
            {isRTL ? <ArrowBack color='secondary' /> : <ArrowForward color='secondary' />} 
          </Box>
        </Box>
      )}

      <Box sx={{ position: 'relative' }}>
        {!isBelowExtraLarge && props.showCustomPaging && (
          <>
            <Box 
              onClick={isRTL ? slickPrev : slickNext}
              className={classes.action} 
              sx={{ position: 'absolute', right: '-50px', top: '50%' }}
            >
              {isRTL ? <ArrowBack color='secondary' /> : <ArrowForward color='secondary' />} 
            </Box>      
      
            <Box 
              onClick={isRTL ? slickNext : slickPrev}
              className={classes.action} 
              sx={{ position: 'absolute', left: '-50px', top: '50%' }}
            >
              {isRTL ? <ArrowForward color='secondary' /> : <ArrowBack color='secondary' />}
            </Box>
          </>
        )}

        <Slider
          // @ts-ignore
          ref={carouselRef}
          {...settings}
          {...props}
        >
          {props.children}
        </Slider>

      </Box>
    </>
  );
};

Carousel.defaultProps = {
  dots: true,
  arrows: false,
  infinite: true,
  autoplay: false,
  showCustomPaging: true,

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
