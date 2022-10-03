import { useContext, useMemo } from 'react';
// Components
import Gallery, {ReactImageGalleryItem, ReactImageGalleryProps} from 'react-image-gallery';
// Utils
import { LayoutContext } from '@/context/layout';

const ImageGallery = ({ items, ...props }: ReactImageGalleryProps) => {
  const { isRTL } = useContext(LayoutContext);

  const enhancedItems = useMemo(() => (items && items.length) ? items.map((item: ReactImageGalleryItem) => ({
    ...item, 
    thumbnailClass: 'base-thumbnail',
    originalClass: 'base-previewed-image',
  })) as ReactImageGalleryItem[] : [], [items]);

  return (
    <Gallery 
      showPlayButton={false}
      showFullscreenButton={false}
      {...props}
      items={enhancedItems}
      isRTL={isRTL}
      thumbnailPosition={isRTL ? 'left' : 'right'}
      lazyLoad
    />
  );
};

export default ImageGallery;
