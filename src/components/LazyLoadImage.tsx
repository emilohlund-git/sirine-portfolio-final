import React, { useState } from 'react'
import LightboxImage from './LightboxImage'
import Spinner from './Spinner'

type PropType = {
  imgSrc: string
  index: number
}

export const LazyLoadImage: React.FC<PropType> = (props) => {
  const { imgSrc, index } = props
  const [hasLoaded, setHasLoaded] = useState(false)

  return (
    <div className="embla__slide">
      <div
        className={'embla__lazy-load'.concat(
          hasLoaded ? ' embla__lazy-load--has-loaded' : '',
        )}
      >
        <div className="embla__slide__number">
          <span>{index + 1}</span>
        </div>
        {!hasLoaded ? <Spinner className="absolute left-0 top-1/2 -translate-y-1/2 z-10 backdrop-blur-md" /> : null}
        <LightboxImage>
          <img onLoad={() => setHasLoaded(true)} className="embla__slide__img embla__lazy-load__img object-contain" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{
            objectFit: 'contain'
          }} src={imgSrc} alt={"Carousel item for Key Insights"} />
        </LightboxImage>
      </div>
    </div>
  )
}
