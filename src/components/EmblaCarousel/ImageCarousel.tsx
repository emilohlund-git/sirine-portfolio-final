'use client'

import useEmblaCarousel, { EmblaCarouselType } from 'embla-carousel-react';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { LazyLoadImage } from '../LazyLoadImage';
import LightboxImage from '../LightboxImage';
import Spinner from '../Spinner';
import { DotButton, NextButton, PrevButton } from './EmblaCarouselButtons';
import './embla.css';

type Props = {
  images?: string[];
  mockup?: boolean;
  size?: 'small' | 'large' | 'full';
  className?: string;
}

const ImageCarousel: React.FC<Props> = ({ images, mockup = false, size = 'large', className }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel()
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  )
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  )
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  )

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on('reInit', onInit)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onInit, onSelect])

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
                    <LazyLoadImage imgSrc={image} index={index} key={image + index} />
                  )
                })}
              </div>
            </div>
            <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
            <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
          </div>

          <div className="embla__dots">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                selected={index === selectedIndex}
                onClick={() => scrollTo(index)}
              />
            ))}
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