'use client'

import React, { useState } from 'react';
import ImageCarousel from './EmblaCarousel/ImageCarousel';

type Props = {
  slides: {
    title: string;
    images: string[];
  }[];
  thumbs: {
    title: string;
    images: string[];
  }[];
}

const ImageCarousels: React.FC<Props> = ({ slides, thumbs }) => {
  const [currentGallery, setCurrentGallery] = useState(slides[0].title);

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 z-[9999]">
        {slides.map((g, index) => <button onClick={() => setCurrentGallery(g.title)} key={index} className={`btn btn-lg rounded-none btn-outline ${currentGallery === g.title ? 'btn-disabled' : ''}`}>{g.title}</button>)}
      </div>
      <ImageCarousel className="h-[80vh]" images={slides.find((g) => g.title === currentGallery)?.images} thumbs={thumbs.find((g) => g.title === currentGallery)?.images} />
    </div>
  )
}

export default ImageCarousels
