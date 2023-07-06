'use client'

import React, { useState } from 'react';
import Spinner from './Spinner';

type Props = {
  url?: string;
}

const FigmaPrototype: React.FC<Props> = ({ url }) => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <iframe onLoad={() => setLoading(false)} style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
        className="h-[80vh] lg:h-[50rem] w-full object-contain" src={url + '&hide-ui=1'} allowFullScreen />
      {loading ?
        <div className="absolute top-0 h-full w-full">
          <Spinner />
        </div>
        : <></>}
    </>
  )
}

export default FigmaPrototype