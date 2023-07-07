import React from 'react';
import { getImage, getImageThumb } from '../utils/pb.utils';
import ImageCarousel from './EmblaCarousel/ImageCarousel';

type Props = {
  galleries: ProjectGallery[];
}

const ImageCarousels: React.FC<Props> = ({ galleries }) => {
  const slidesArray: string[] = [];
  const thumbsArray: string[] = [];
  for (const gallery of galleries) {
    const urls = gallery.gallery_images.map((g) => getImage(gallery, g));
    const thumbsUrls = gallery.gallery_images.map((g) => getImageThumb(gallery, g));
    slidesArray.push(...urls);
    thumbsArray.push(...thumbsUrls);
  }

  return (
    <div>
      <ImageCarousel className="h-[80vh]" images={slidesArray} thumbs={thumbsArray} />
    </div>
  )
}

export default ImageCarousels
