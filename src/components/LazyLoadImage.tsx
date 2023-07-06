import React, { useCallback, useState } from 'react'
import LightboxImage from './LightboxImage'
import Spinner from './Spinner'

type PropType = {
  imgSrc: string
  inView: boolean
  index: number
}

export const LazyLoadImage: React.FC<PropType> = (props) => {
  const { imgSrc, inView, index } = props
  const [hasLoaded, setHasLoaded] = useState(false)

  const setLoaded = useCallback(() => {
    if (inView) setHasLoaded(true)
  }, [inView, setHasLoaded])

  return (
    <div className="embla__slide">
      <div
        className={'relative embla__lazy-load'.concat(
          hasLoaded ? ' embla__lazy-load--has-loaded' : '',
        )}
      >
        {!hasLoaded && <Spinner className="absolute top-1/2 -translate-y-1/2 z-[100] filter backdrop-grayscale backdrop-contrast-50 backdrop-saturate-50 b" />}
        <div className="embla__slide__number">
          <span>{index + 1}</span>
        </div>
        <LightboxImage>
          <img
            className="embla__slide__img embla__lazy-load__img"
            onLoad={setLoaded}
            src={imgSrc}
            alt="Your alt text"
            data-src={imgSrc}
          />
        </LightboxImage>
      </div>
    </div>
  )
}
