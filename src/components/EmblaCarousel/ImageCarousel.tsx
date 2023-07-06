'use client'

import useEmblaCarousel, { EmblaCarouselType } from 'embla-carousel-react';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { LazyLoadImage } from '../LazyLoadImage';
import LightboxImage from '../LightboxImage';
import Spinner from '../Spinner';
import { Thumb } from './EmblaThumbButton';
import './embla.css';

type Props = {
  images?: string[];
  mockup?: boolean;
  size?: 'small' | 'large' | 'full';
  className?: string;
}

const ImageCarousel: React.FC<Props> = ({ images, mockup = false, size = 'large', className }) => {
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

  const [loaded, setLoaded] = useState(false);

  if (!images) return <Spinner />

  return (
    <>
      {images && images.length > 1 ?
        <>
          <div className="embla bg-white">
            <div className="embla__viewport" ref={emblaRef}>
              <div className="embla__container">
                {images.map((image, index) => {
                  return (
                    <LazyLoadImage key={index}
                      index={index}
                      imgSrc={image}
                      inView={slidesInView.indexOf(index) > -1} />
                  )
                })}
              </div>
            </div>
          </div>

          <div className="embla-thumbs">
            <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
              <div className="embla-thumbs__container">
                {images.map((img, index) => (
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
        :
        <div className={`relative w-full h-full ${size === 'large' ? 'lg:h-[40rem]' : size === 'full' ? 'lg:h-full' : 'lg:h-[20rem]'}`}>
          <LightboxImage>
            {!loaded ? <Spinner className="absolute left-0 top-1/2 -translate-y-1/2 z-10 backdrop-blur-md" /> : null}
            <Image onLoad={() => setLoaded(true)} className="cursor-zoom-in z-0" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" fill style={{
              objectFit: 'contain'
            }} src={images[0]} alt={"Carousel item for Key Insights"} />
          </LightboxImage>
        </div>
      }
    </>
  )
}

export default ImageCarousel