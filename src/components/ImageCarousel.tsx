'use client'

import Image from 'next/image';
import React from 'react';

type Props = {
  images?: string[];
}

const ImageCarousel: React.FC<Props> = ({ images }) => {
  return (
    <div className="carousel rounded-none h-full w-full bg-[#e5e5e9]">
      {images?.map((image, index) => {
        return (
          <div id={`slide${index}`} key={image + index} className="carousel-item w-full h-full relative">
            <Image fill style={{
              objectFit: 'contain'
            }} src={image} alt={"Carousel item for Key Insights"} />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href={`#slide${index - 1}`} className="btn btn-lg btn-ghost btn-circle">❮</a>
              <a href={`#slide${index + 1}`} className="btn btn-lg btn-ghost btn-circle">❯</a>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ImageCarousel