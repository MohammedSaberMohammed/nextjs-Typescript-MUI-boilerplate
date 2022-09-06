import { useContext, useMemo } from 'react';
// Components
import Gallery, {ReactImageGalleryItem, ReactImageGalleryProps} from 'react-image-gallery';
import { LayoutContext } from '@/context/layout';
const ImageGallery = (props: ReactImageGalleryProps) => {
  const { isRTL } = useContext(LayoutContext);

  const items = useMemo(() => props.items.map((item: ReactImageGalleryItem) => ({
    ...item, 
    thumbnailClass: 'base-thumbnail',
    originalClass: 'base-previewed-image',
  })) as ReactImageGalleryItem[], [props.items]);

  return (
    <Gallery 
      showPlayButton={false}
      showFullscreenButton={false}
      {...props}
      items={items}
      isRTL={isRTL}
      lazyLoad
    />
  );
};

export default ImageGallery;
