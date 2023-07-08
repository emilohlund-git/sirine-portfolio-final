'use client'

import React, { useState } from 'react';
import GradientButton from '../common/GradientButton';
import ImageCarousel from './ImageCarousel';

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
      <div className="absolute join lg:join-horizontal rounded-none top-0 left-0 z-[100]">
        {slides.map((g, index) => <GradientButton className={`h-14 text-xs lg:text-lg lg:h-20 bg-black ${currentGallery === g.title ? 'bg-opacity-90' : 'bg-opacity-80'}`} onClick={() => setCurrentGallery(g.title)} key={index} aria-label={g.title}>{g.title}</GradientButton>)}
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
