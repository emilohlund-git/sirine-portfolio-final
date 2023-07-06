'use client'

import useEmblaCarousel, { EmblaCarouselType } from 'embla-carousel-react';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { LazyLoadImage } from '../LazyLoadImage';
import LightboxImage from '../LightboxImage';
import Spinner from '../Spinner';
import { NextButton, PrevButton } from './EmblaCarouselButtons';
import './embla.css';

type Props = {
  images?: string[];
  mockup?: boolean;
}

const ImageCarousel: React.FC<Props> = ({ images, mockup = false }) => {
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
          <div className="embla">
            <div className="embla__viewport" ref={emblaRef}>
              <div className="embla__container">
                {images.map((image, index) => {
                  return (
                    <LazyLoadImage key={index} imgSrc={image} index={index} />
                  )
                })}
              </div>
            </div>
            <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
            <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
          </div>
        </>
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
    </>
  )
}

export default ImageCarousel