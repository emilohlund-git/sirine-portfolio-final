'use client'

import { RiArrowUpDoubleLine } from 'react-icons/ri';
import GradientButton from './GradientButton';

type Props = {}

const ScrollToTopButton = (props: Props) => {
  const isBrowser = () => typeof window !== 'undefined';

  function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <GradientButton position='fixed' onClick={() => scrollToTop()} className="btn btn-square m-8 right-0 bottom-0">
      <RiArrowUpDoubleLine className="w-8 h-8 pb-2" />
    </GradientButton>
  )
}

export default ScrollToTopButton