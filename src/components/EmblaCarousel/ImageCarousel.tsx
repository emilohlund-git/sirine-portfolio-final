'use client'

import useEmblaCarousel, { EmblaCarouselType } from 'embla-carousel-react';
import React, { CSSProperties, useCallback, useEffect, useState } from 'react';
import { LazyLoadImage } from '../LazyLoadImage';
import Spinner from '../Spinner';
import { Thumb } from './EmblaThumbButton';
import './embla.css';

type Props = {
  images?: string[];
  thumbs?: string[];
  mockup?: boolean;
  size?: 'small' | 'large' | 'full';
  className?: string;
  style?: CSSProperties;
}

const ImageCarousel: React.FC<Props> = ({ images, thumbs, mockup = false, size = 'large', className, style }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel()
  const [slidesInView, setSlidesInView] = useState<number[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  })

  const updateSlidesInView = useCallback((emblaApi: EmblaCarouselType) => {
    setSlidesInView((slidesInView) => {
      if (slidesInView.length === emblaApi.slideNodes().length) {
        emblaApi.off('select', updateSlidesInView)
      }
      const inView = emblaApi
        .slidesInView(true)
        .filter((index) => !slidesInView.includes(index))
      return slidesInView.concat(inView)
    })
  }, [])

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaApi || !emblaThumbsApi) return
      emblaApi.scrollTo(index)
    },
    [emblaApi, emblaThumbsApi],
  )

  const onSelect = useCallback(() => {
    if (!emblaApi || !emblaThumbsApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaThumbsApi.scrollTo(emblaApi.selectedScrollSnap())
  }, [emblaApi, emblaThumbsApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaApi) return

    updateSlidesInView(emblaApi)
    emblaApi.on('select', updateSlidesInView)
    emblaApi.on('reInit', updateSlidesInView)
  }, [emblaApi, updateSlidesInView])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  if (!images) return <Spinner />

  return (
    <>
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {images.map((image, index) => {
              return (
                <LazyLoadImage key={index}
                  src={image}
                  alt="any"
                  className={className}
                  style={style}
                />
              )
            })}
          </div>
        </div>
      </div>

      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container">
            {images?.map((img, index) => (
              <Thumb
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                index={index}
                imgSrc={img}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ImageCarousel