'use client'

import Image from 'next/image';
import React, { useState } from 'react';
import LightboxImage from './LightboxImage';
import Spinner from './Spinner';

type Props = {
  images?: string[];
}

const ImageCarousel: React.FC<Props> = ({ images }) => {
  const [loaded, setLoaded] = useState(false);

  if (!images) return <Spinner />

  return (
    <div className="carousel rounded-none h-full w-full bg-[#fff]">
      {images && images.length > 1 ? images.map((image, index) => {
        return (
          <div id={`slide${index}`} key={image + index} className="carousel-item w-full h-full relative">
            <Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" fill style={{
              objectFit: 'contain'
            }} src={image} alt={"Carousel item for Key Insights"} />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href={`#slide${index - 1}`} className="btn btn-lg btn-ghost btn-circle">❮</a>
              <a href={`#slide${index + 1}`} className="btn btn-lg btn-ghost btn-circle">❯</a>
            </div>
          </div>
        )
      })
        :
        <div className="relative w-full h-full">
          <LightboxImage>
            {!loaded ? <Spinner className="absolute left-0 top-1/2 -translate-y-1/2 z-10 backdrop-blur-md" /> : null}
            <Image onLoad={() => setLoaded(true)} className="cursor-zoom-in z-0" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" fill style={{
              objectFit: 'contain'
            }} src={images[0]} alt={"Carousel item for Key Insights"} />
          </LightboxImage>
        </div>
      }
    </div>
  )
}

export default ImageCarousel