import React, { useState } from 'react'
import LightboxImage from './LightboxImage'

type PropType = {
  imgSrc: string
  index: number
}

export const LazyLoadImage: React.FC<PropType> = (props) => {
  const { imgSrc, index } = props
  const [hasLoaded, setHasLoaded] = useState(false)

  return (
    <div className="embla__slide">
      <div className="embla__slide__number">
        <span>{index + 1}</span>
      </div>
      <LightboxImage>
        <img className="embla__slide__img embla__lazy-load__img object-contain" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{
          objectFit: 'contain'
        }} src={imgSrc} alt={"Carousel item for Key Insights"} />
      </LightboxImage>
    </div>
  )
}
