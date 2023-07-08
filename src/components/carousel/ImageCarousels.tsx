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
  const [filter, setFilter] = useState('');
  const [sliderValue, setSliderValue] = useState(0);

  const handleChange = (event: any) => {
    setSliderValue(event.target.value);
  };

  const getHexColor = () => {
    const redValue = Math.round((sliderValue / 100) * 255);
    const blueValue = Math.round(((100 - sliderValue) / 100) * 255);
    const alpha = Math.abs(sliderValue - 50) / 50; // Calculate alpha value based on the distance from 50
    const hexColor = `#${redValue.toString(16).padStart(2, '0')}00${blueValue.toString(16).padStart(2, '0')}`;
    const rgbaColor = hexToRgba(hexColor, alpha);
    return rgbaColor;
  };

  const hexToRgba = (hex: string, alpha: number) => {
    const hexValue = hex.substring(1); // Remove the #
    const red = parseInt(hexValue.substring(0, 2), 16);
    const green = parseInt(hexValue.substring(2, 4), 16);
    const blue = parseInt(hexValue.substring(4, 6), 16);
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  };

  const colorStyle = {
    backgroundColor: getHexColor(),
  };

  return (
    <div className="relative filter ">
      <div className="pointer-events-none" style={{
        ...colorStyle,
        zIndex: 10,
        position: 'absolute',
        width: '100%',
        height: '100%',
        mixBlendMode: 'darken'
      }} />
      <div className="lg:w-1/3 w-full lg:right-5 lg:top-5 px-4 top-20 absolute z-[200]">
        <input type="range" min={0} max="100" value={sliderValue} onChange={handleChange} className="range" step="50" />
        <div className="w-full flex text-white justify-between text-xs px-2">
          <span>Blue</span>
          <span>|</span>
          <span>Neutral</span>
          <span>|</span>
          <span>Red</span>
        </div>
      </div>
      <div className="absolute join lg:join-horizontal rounded-none top-0 left-0 z-[100]">
        {slides.map((g, index) => <GradientButton className={`h-14 text-xs lg:text-sm lg:h-16 bg-black ${currentGallery === g.title ? 'bg-opacity-90' : 'bg-opacity-80'}`} onClick={() => setCurrentGallery(g.title)} key={index} aria-label={g.title}>{g.title}</GradientButton>)}
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
