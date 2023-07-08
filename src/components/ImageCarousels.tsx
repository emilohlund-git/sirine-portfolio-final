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
      <div className="absolute join join-vertical lg:join-horizontal rounded-none top-0 left-0 z-[100]">
        {slides.map((g, index) => <button onClick={() => setCurrentGallery(g.title)} key={index} className={`btn btn-outline hover:bg-white text-black btn-lg join-item ${currentGallery === g.title ? 'bg-white' : ''}`} aria-label={g.title}>{g.title}</button>)}
      </div>
      {slides.filter((g) => g.title === currentGallery).map((g, index) => {
        return (
          <ImageCarousel key={g.title + index} className="h-[80vh]" images={g?.images} thumbs={g?.images} />
        )
      })}
    </div>
  )
}

export default ImageCarousels
