import Image from 'next/image'
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
    <div className="embla__slide h-[70vh]">
      {!hasLoaded && <Spinner />}
      <LightboxImage>
        <Image
          fill
          className="embla__slide__img object-contain"
          onLoad={setLoaded}
          src={imgSrc}
          alt="Your alt text"
          data-src={imgSrc}
        />
      </LightboxImage>
    </div>
  )
}
