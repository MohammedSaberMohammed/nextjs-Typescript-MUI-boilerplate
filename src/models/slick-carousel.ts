import { ReactNode } from 'react';

export interface SlickCarouselProps {
  dots?: boolean;
  arrows?: boolean;
  autoplay?: boolean;
  infinite?: boolean;
  draggable?: boolean;
  pauseOnDotsHover?: boolean;

  speed?: number;
  slidesToShow?: number;
  slidesToScroll?: number;
  initialSlide?: number;

  responsive: () => [];
  // Methods
  customPaging: () => ReactNode
}