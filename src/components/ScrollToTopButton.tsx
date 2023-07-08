'use client'

import { RiArrowUpDoubleLine } from 'react-icons/ri'

type Props = {}

const ScrollToTopButton = (props: Props) => {
  const isBrowser = () => typeof window !== 'undefined';

  function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <button onClick={() => scrollToTop()} className="btn btn-square m-8 right-0 bottom-0 fixed">
      <RiArrowUpDoubleLine className="w-8 h-8" />
    </button>
  )
}

export default ScrollToTopButton