'use client'

import Image, { ImageProps } from 'next/image'
import React, { useState } from 'react'
import LightboxImage from './LightboxImage'
import Spinner from './Spinner'

export const LazyLoadImage: React.FC<ImageProps> = ({ className, onLoad, alt, ...props }) => {
  const [hasLoaded, setHasLoaded] = useState(false)

  const onLoadCallback = (e: any) => {
    setHasLoaded(true)
    typeof onLoad === "function" && onLoad(e);
  }

  return (
    <div className="embla__slide">
      <div
        className={'relative h-[60vh] embla__lazy-load'.concat(
          hasLoaded ? ' embla__lazy-load--has-loaded' : '',
        )}
      >
        {!hasLoaded && <Spinner className="absolute top-1/2 -translate-y-1/2 z-[100] filter backdrop-grayscale backdrop-contrast-50 backdrop-saturate-50 backdrop-opacity-20 backdrop-blur-sm" />}
        <LightboxImage>
          <Image
            fill
            className={`embla__slide__img embla__lazy-load__img h-[60vh] ${className}`}
            alt={alt}
            onLoad={onLoadCallback}
            {...props}
          />
        </LightboxImage>
      </div>
    </div>
  )
}
